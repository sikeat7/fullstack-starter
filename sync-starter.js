#!/usr/bin/env node
/**
 * Sync changes from the "starter" repository into a derived project.
 *
 * Goals:
 * - Cross-platform (Windows/macOS/Linux) by using Node + git CLI.
 * - Auto-detect the starter remote (upstream/starter/template/etc.).
 * - Fetch + merge with friendly English messages.
 */

const { execFileSync, spawnSync } = require("node:child_process");
const readline = require("node:readline");

const STARTER_REPO_DEFAULT = "JoaquinVilchez/fullstack-starter";
const STARTER_URL_REGEX = /(^|\/)JoaquinVilchez\/fullstack-starter(\.git)?$/i;

function color(text, code) {
  if (!process.stdout.isTTY) return text;
  return `\u001b[${code}m${text}\u001b[0m`;
}

const fmt = {
  ok: (t) => color(t, "32"),
  warn: (t) => color(t, "33"),
  err: (t) => color(t, "31"),
  dim: (t) => color(t, "90"),
  bold: (t) => color(t, "1"),
};

function logStep(emoji, msg) {
  process.stdout.write(`${emoji} ${msg}\n`);
}

function die(msg, code = 1) {
  process.stderr.write(`${fmt.err("❌")} ${msg}\n`);
  process.exit(code);
}

function runGit(args, opts = {}) {
  const res = spawnSync("git", args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    ...opts,
  });

  if (res.error) {
    if (res.error.code === "ENOENT") {
      die("Cannot find `git` in your system. Please install Git and try again.");
    }
    throw res.error;
  }

  return {
    code: res.status ?? 0,
    stdout: (res.stdout || "").trimEnd(),
    stderr: (res.stderr || "").trimEnd(),
  };
}

function gitOrDie(args, errMsg) {
  const r = runGit(args);
  if (r.code !== 0) {
    const details = [r.stderr, r.stdout].filter(Boolean).join("\n");
    die(`${errMsg}\n${details ? `\n${fmt.dim(details)}\n` : ""}`);
  }
  return r.stdout;
}

function parseArgs(argv) {
  const args = {
    remote: null,
    repo: null,
    branch: null,
    push: false,
    yes: false,
    dryRun: false,
    help: false,
  };

  const rest = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--help" || a === "-h") args.help = true;
    else if (a === "--remote") args.remote = argv[++i] || null;
    else if (a === "--repo") args.repo = argv[++i] || null;
    else if (a === "--branch") args.branch = argv[++i] || null;
    else if (a === "--push") args.push = true;
    else if (a === "--yes" || a === "-y") args.yes = true;
    else if (a === "--dry-run") args.dryRun = true;
    else rest.push(a);
  }

  // Allow env overrides (useful for CI)
  if (!args.remote && process.env.STARTER_REMOTE) args.remote = process.env.STARTER_REMOTE;
  if (!args.repo && process.env.STARTER_REPO) args.repo = process.env.STARTER_REPO;
  if (!args.branch && process.env.STARTER_BRANCH) args.branch = process.env.STARTER_BRANCH;
  if (!args.push && process.env.STARTER_PUSH === "1") args.push = true;
  if (!args.yes && process.env.STARTER_YES === "1") args.yes = true;

  return args;
}

function printHelp() {
  const msg = `
${fmt.bold("sync-starter")} — sync changes from starter into your derived project

Usage:
  pnpm sync:starter
  pnpm sync:starter -- --remote upstream
  pnpm sync:starter -- --branch main
  pnpm sync:starter -- --push
  pnpm sync:starter -- --yes

Options:
  --remote <name>   Force starter remote (e.g.: upstream, starter)
  --repo <owner/repo|url>  Starter repo (default: ${STARTER_REPO_DEFAULT})
  --branch <name>   Force starter branch (if not detected)
  --push            Offer to push (or push if --yes)
  --yes, -y         Non-interactive (assumes "yes" to questions)
  --dry-run         Only detect remote/branch and show what would be done
  --help, -h        Help

Environment variables (CI):
  STARTER_REMOTE, STARTER_REPO, STARTER_BRANCH, STARTER_PUSH=1, STARTER_YES=1
`.trim();
  process.stdout.write(`${msg}\n`);
}

function ensureGitRepo() {
  const inside = runGit(["rev-parse", "--is-inside-work-tree"]);
  if (inside.code !== 0 || inside.stdout.trim() !== "true") {
    die("This doesn't appear to be a Git repository. Run this inside your project (where `.git` exists).");
  }
}

function ensureCleanWorkingTree() {
  const status = gitOrDie(["status", "--porcelain"], "Could not read Git status.");
  if (status.trim().length > 0) {
    die(
      [
        "You have uncommitted local changes.",
        "Save them before synchronizing:",
        `- ${fmt.bold("Option A")}: commit (recommended)`,
        `- ${fmt.bold("Option B")}: stash → \`git stash -u\``,
      ].join("\n"),
    );
  }
}

function normalizeRepoToUrl(repoOrUrl) {
  if (!repoOrUrl) return null;
  if (/^https?:\/\//i.test(repoOrUrl)) return repoOrUrl.replace(/\/$/, "");
  if (/^[\w.-]+\/[\w.-]+$/i.test(repoOrUrl)) return `https://github.com/${repoOrUrl}.git`;
  return repoOrUrl;
}

function getRemotes() {
  // Parse `git remote -v` (works cross-platform).
  const out = gitOrDie(["remote", "-v"], "Could not list remotes.");
  const lines = out.split("\n").map((l) => l.trim()).filter(Boolean);
  /** @type {{name: string, url: string, type: 'fetch'|'push'}[]} */
  const remotes = [];
  for (const line of lines) {
    // Example: upstream  https://github.com/... (fetch)
    const m = line.match(/^(\S+)\s+(\S+)\s+\((fetch|push)\)$/);
    if (!m) continue;
    remotes.push({ name: m[1], url: m[2], type: m[3] });
  }
  return remotes;
}

function guessStarterRemote({ forcedRemote, starterRepoOrUrl }) {
  const remotes = getRemotes();
  const byName = new Map();
  for (const r of remotes) {
    if (r.type !== "fetch") continue;
    byName.set(r.name, r.url);
  }

  if (forcedRemote) {
    const url = byName.get(forcedRemote);
    if (!url) {
      const names = Array.from(byName.keys()).sort().join(", ") || "(none)";
      die(`Remote '${forcedRemote}' does not exist. Available remotes: ${names}`);
    }
    return { name: forcedRemote, url };
  }

  const starterUrl = normalizeRepoToUrl(starterRepoOrUrl || STARTER_REPO_DEFAULT);
  const starterHostHint = starterUrl ? starterUrl.replace(/^https?:\/\//, "") : null;

  // Strong match: URL ends with JoaquinVilchez/fullstack-starter(.git)
  for (const [name, url] of byName.entries()) {
    if (STARTER_URL_REGEX.test(url)) return { name, url };
  }

  // If user provided --repo, prefer matching that (owner/repo or url).
  if (starterHostHint) {
    for (const [name, url] of byName.entries()) {
      if (url.includes(starterHostHint)) return { name, url };
    }
  }

  // Heuristics: common remote names.
  const common = ["upstream", "starter", "template", "base"];
  for (const candidate of common) {
    const url = byName.get(candidate);
    if (url) return { name: candidate, url };
  }

  return null;
}

function detectRemoteDefaultBranch(remoteName) {
  // Try to detect the HEAD branch of the remote.
  const out = runGit(["remote", "show", remoteName]);
  if (out.code !== 0) return null;
  const m = out.stdout.match(/HEAD branch:\s*(\S+)/);
  return m ? m[1] : null;
}

function currentBranch() {
  const b = gitOrDie(["rev-parse", "--abbrev-ref", "HEAD"], "Could not detect current branch.");
  return b.trim();
}

function askYesNo(question, { assumeYes } = {}) {
  if (assumeYes) return Promise.resolve(true);
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question(question, (ans) => {
      rl.close();
      const v = String(ans || "").trim().toLowerCase();
      resolve(v === "y" || v === "yes" || v === "s" || v === "si" || v === "sí" || v === "true" || v === "1");
    });
  });
}

function summarizeChanges(beforeHead) {
  const afterHead = gitOrDie(["rev-parse", "HEAD"], "Could not read HEAD.");
  if (beforeHead === afterHead) return [];
  const diff = runGit(["diff", "--name-status", `${beforeHead}..${afterHead}`]);
  if (diff.code !== 0) return [];
  return diff.stdout
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  logStep("🔍", "Checking Git repository…");
  ensureGitRepo();

  // Safety: avoid merging with local changes.
  logStep("🧹", "Checking for pending local changes…");
  ensureCleanWorkingTree();

  logStep("🔍", "Detecting starter remote…");
  const starter = guessStarterRemote({ forcedRemote: args.remote, starterRepoOrUrl: args.repo });
  if (!starter) {
    const remotes = getRemotes()
      .filter((r) => r.type === "fetch")
      .map((r) => `${r.name} -> ${r.url}`);
    const list = remotes.length ? remotes.map((r) => `- ${r}`).join("\n") : "- (no remotes)";
    die(
      [
        "Could not automatically detect the starter remote.",
        "",
        "Remotes found:",
        list,
        "",
        "Solution (recommended): add the starter as a remote and try again:",
        `  git remote add upstream https://github.com/${STARTER_REPO_DEFAULT}.git`,
        "",
        "Or run specifying the remote manually:",
        "  pnpm sync:starter -- --remote upstream",
      ].join("\n"),
    );
  }

  logStep("✅", `Remote found: ${fmt.bold(starter.name)} -> ${starter.url}`);

  const defaultBranch = args.branch || detectRemoteDefaultBranch(starter.name) || "main";
  logStep("🧭", `Starter branch: ${fmt.bold(defaultBranch)}`);

  if (args.dryRun) {
    logStep("🧪", "Dry-run: I won't fetch/merge. Everything OK.");
    return;
  }

  logStep("🔄", `Fetching changes from starter (${starter.name})…`);
  gitOrDie(["fetch", "--prune", starter.name], "Failed `git fetch` from starter.");
  logStep("✅", "Fetch completed");

  const localBranch = currentBranch();
  const beforeHead = gitOrDie(["rev-parse", "HEAD"], "Could not read HEAD before merge.");
  const mergeTarget = `${starter.name}/${defaultBranch}`;

  logStep("🔀", `Merging ${mergeTarget} into ${fmt.bold(localBranch)}…`);
  const merge = runGit(["merge", "--no-edit", mergeTarget], { stdio: ["ignore", "pipe", "pipe"] });

  if (merge.code !== 0) {
    // Conflicts or other errors.
    const details = [merge.stderr, merge.stdout].filter(Boolean).join("\n");
    process.stdout.write(`${fmt.warn("⚠️")} Merge could not be completed automatically.\n`);
    if (details) process.stdout.write(`${fmt.dim(details)}\n`);

    process.stdout.write(
      [
        "",
        fmt.bold("What to do now:"),
        `- Check conflicts: ${fmt.bold("git status")}`,
        "- Resolve conflicting files (markers <<<<<<< ======= >>>>>>>)",
        `- Mark resolved: ${fmt.bold("git add -A")}`,
        `- Complete merge: ${fmt.bold("git commit")}`,
        `- Or abort merge: ${fmt.bold("git merge --abort")}`,
        "",
      ].join("\n"),
    );
    process.exit(2);
  }

  logStep("✅", "Merge successful!");

  const changes = summarizeChanges(beforeHead);
  if (changes.length) {
    logStep("📦", "Updated files:");
    for (const line of changes) {
      process.stdout.write(`  - ${line}\n`);
    }
  } else {
    logStep("📦", "No file changes detected (might have been an empty merge).");
  }

  // Offer push: only makes sense if origin exists.
  const originUrl = runGit(["remote", "get-url", "origin"]);
  if (originUrl.code !== 0) {
    logStep("ℹ️", "No `origin` remote found. If you want to push, add it first.");
    return;
  }

  if (args.push) {
    const doPush = await askYesNo("📤 Do you want to push changes now? (y/n) ", { assumeYes: args.yes });
    if (!doPush) {
      logStep("🧾", `Ready. When you want, run: ${fmt.bold("git push")}`);
      return;
    }

    logStep("📤", "Pushing to origin…");
    gitOrDie(["push"], "Failed `git push`.");
    logStep("✅", "Push completed");
    return;
  }

  const doPush = await askYesNo("📤 Do you want to push changes now? (y/n) ", { assumeYes: args.yes });
  if (!doPush) {
    logStep("🧾", `Perfect. You can push later with: ${fmt.bold("git push")}`);
    return;
  }

  logStep("📤", "Pushing to origin…");
  gitOrDie(["push"], "Failed `git push`.");
  logStep("✅", "Push completed");
}

main().catch((e) => {
  die(`Unexpected error: ${e && e.message ? e.message : String(e)}`);
});

