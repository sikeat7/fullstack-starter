# 🔄 Synchronization with the starter (`fullstack-starter`)

This repo is designed to be **cloned and evolve** as a new project. Over time, the original starter receives improvements, and this document explains how to **keep your derived project synchronized** in a simple and safe way.

## 🎯 Objective

- **Your derived project**: your repo (your product).
- **The starter**: `JoaquinVilchez/fullstack-starter` (the base).
- **Key idea**: in your derived project you add the starter as an **additional remote** (typically `upstream` or `starter`) and periodically merge its changes.

> Recommendation: use a remote called `upstream` (popular convention). But the script in this repo detects the remote even if it has a different name (`starter`, `template`, etc.).

---

## 1) Initial setup (clone and configure remotes)

### A. Create a derived project (most common)

1. Clone the starter:

```bash
git clone https://github.com/JoaquinVilchez/fullstack-starter.git my-project
cd my-project
```

2. Change `origin` to your repo (so that `origin` is YOUR project):

```bash
git remote rename origin upstream
git remote add origin https://github.com/YOUR_USER/my-project.git
git push -u origin main
```

3. Verify the remotes:

```bash
git remote -v
```

You should see something similar:
- `origin` → your repo
- `upstream` → the starter

### B. If you already had your repo and want to add the starter as a remote

```bash
git remote add upstream https://github.com/JoaquinVilchez/fullstack-starter.git
git remote -v
```

---

## 2) Recommended daily workflow (derived project)

- Work normally on branches:

```bash
git checkout -b feat/my-feature
```

- Make small and clear commits.
- Keep your `main` stable.
- Before synchronizing, ideally:
  - Commit or stash local changes.
  - Be on the branch where you want to incorporate changes (normally `main`).

---

## 3) Update: synchronize changes from the starter

### Recommended option (automatic): `pnpm sync:starter`

This repo includes a script that:
- Automatically detects the starter remote.
- Does `git fetch` from the starter.
- Attempts `git merge`.
- If there are conflicts, tells you exactly how to proceed.

```bash
pnpm sync:starter
```

You can also use:

```bash
npm run sync:starter
```

### Useful script flags

- **Choose remote manually**:

```bash
pnpm sync:starter -- --remote upstream
```

- **Force starter branch** (if it's not `main` or you want another):

```bash
pnpm sync:starter -- --branch main
```

- **Non-interactive (CI)**:

```bash
pnpm sync:starter -- --yes
```

- **Push automatically at the end**:

```bash
pnpm sync:starter -- --push
```

> Note: with pnpm/npm, script arguments are passed after `--`.

---

## 4) Manual update (without script)

1. Fetch from the starter:

```bash
git fetch upstream
```

2. Merge the starter branch:

```bash
git checkout main
git merge upstream/main
```

3. If everything went well, push to your repo:

```bash
git push origin main
```

---

## 5) Conflict handling (quick guide)

If the merge marks conflicts:

1. See which files are in conflict:

```bash
git status
```

2. Open the conflicted files and resolve the marked sections:
- `<<<<<<<`
- `=======`
- `>>>>>>>`

3. Mark as resolved:

```bash
git add -A
```

4. Complete the merge:

```bash
git commit
```

5. If you want to cancel the merge:

```bash
git merge --abort
```

Tip: if the conflict is complex, you can resolve in stages and test before pushing.

---

## 6) Contribute back to the starter (from a derived project)

If you made a generic improvement (tooling, DX, templates, helpers) that should go back to the starter:

1. In your derived project, add the starter repo as a remote (if it doesn't exist):

```bash
git remote add upstream https://github.com/JoaquinVilchez/fullstack-starter.git
```

2. Create a branch with the change:

```bash
git checkout -b feat/improvement-for-starter
```

3. Apply your improvement and commit.

4. Ideally, open a PR to the starter from:
- a fork of the starter, or
- a branch in your fork of the starter.

In practice:
- Fork `JoaquinVilchez/fullstack-starter`
- Upload your branch to the fork
- Open PR to the starter with a clear description

---

## 7) Tips to avoid pain

- Synchronize often so merges are small.
- Avoid modifying "base" starter files without need (central configs), or document why.
- If your project needs to deviate, prefer to "extend" rather than "edit" (when possible).

---

## 8) How to test synchronization (quick)

In a derived project:

1. Make sure you have the starter remote:

```bash
git remote -v
```

2. Run:

```bash
pnpm sync:starter
```

3. Verify changes:

```bash
git status
git log --oneline -n 5
```

