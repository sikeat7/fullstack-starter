'use client';

import { FormExample } from '@/components/examples/form-example';
import { QueryExample } from '@/components/examples/query-example';
import { TableExample } from '@/components/examples/table-example';
import { Button } from '@/components/ui/button';

/**
 * Project welcome page.
 * Intended for newcomers: stack, commands, and repo structure.
 * Easy to remove/replace once real product work starts.
 */

export default function HomePage() {
  return (
    <main className="container mx-auto max-w-6xl px-4 py-12 space-y-12">
      <header className="relative overflow-hidden rounded-2xl border bg-card p-8 md:p-10">
        <div className="pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_60%)]">
          <div className="absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500/30 via-purple-500/25 to-pink-500/20 blur-3xl" />
        </div>

        <div className="relative space-y-5">
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="inline-flex items-center rounded-full border bg-background px-2.5 py-1 text-muted-foreground">
              Next.js
            </span>
            <span className="inline-flex items-center rounded-full border bg-background px-2.5 py-1 text-muted-foreground">
              NestJS
            </span>
            <span className="inline-flex items-center rounded-full border bg-background px-2.5 py-1 text-muted-foreground">
              Prisma
            </span>
            <span className="inline-flex items-center rounded-full border bg-background px-2.5 py-1 text-muted-foreground">
              Turborepo
            </span>
            <span className="inline-flex items-center rounded-full border bg-background px-2.5 py-1 text-muted-foreground">
              TypeScript
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl font-semibold tracking-tight">
              Fullstack Starter
            </h1>
            <p className="max-w-2xl text-muted-foreground">
              A TypeScript monorepo to move fast: frontend (Next) + backend (Nest)
              with shared packages. This page is just the project introduction and
              can be safely deleted once you start building real features.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a href="#getting-started">
              <Button>Getting started</Button>
            </a>
            <a href="#stack">
              <Button variant="outline">Stack</Button>
            </a>
            <a href="#structure">
              <Button variant="outline">Structure</Button>
            </a>
            <a href="#examples">
              <Button variant="secondary">Examples</Button>
            </a>
          </div>
        </div>
      </header>

      <section id="stack" className="space-y-4">
        <h2 className="text-2xl font-semibold">Stack (high level)</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <Card title="Frontend (apps/client)">
            <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
              <li><strong>Next.js</strong> (App Router) + <strong>React</strong></li>
              <li><strong>TypeScript</strong> + ESLint</li>
              <li><strong>Tailwind CSS</strong> (+ tailwindcss-animate)</li>
              <li><strong>next-intl</strong> (i18n)</li>
              <li><strong>TanStack Query</strong> (fetching/cache) + DevTools</li>
              <li><strong>TanStack Table</strong> (tables)</li>
              <li><strong>react-hook-form</strong> + <strong>@hookform/resolvers</strong> (forms)</li>
              <li><strong>cva</strong> + <strong>clsx</strong> + <strong>cn()</strong> (styling)</li>
            </ul>
          </Card>

          <Card title="Backend (apps/api)">
            <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
              <li><strong>NestJS</strong> (API)</li>
              <li><strong>Prisma</strong> (ORM)</li>
              <li><strong>PostgreSQL</strong> (DB) + <strong>Redis</strong> (local infra)</li>
              <li><strong>Swagger</strong> (docs)</li>
              <li><strong>nestjs-i18n</strong> (i18n en API)</li>
              <li><strong>Zod</strong> (validation; shared schemas)</li>
            </ul>
          </Card>

          <Card title="Monorepo & tooling" className="md:col-span-2">
            <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
              <li><strong>Turborepo</strong> (pipelines/build/lint)</li>
              <li><strong>pnpm workspaces</strong> (deps)</li>
              <li><strong>ESLint</strong> + <strong>Prettier</strong></li>
              <li><strong>Jest</strong> (testing tooling)</li>
              <li>Internal packages: <strong>@repo/data</strong>, <strong>@repo/ui</strong>, <strong>@repo/i18n</strong>, <strong>@repo/config</strong>, <strong>@repo/core</strong></li>
            </ul>
          </Card>
        </div>
      </section>

      <section id="getting-started" className="space-y-4">
        <h2 className="text-2xl font-semibold">Getting started</h2>

        <div className="rounded-2xl border bg-card p-6 space-y-4 text-sm">
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <div className="font-medium">Install</div>
              <pre className="mt-1 rounded-md bg-muted p-3 overflow-auto"><code>pnpm install</code></pre>
            </div>
            <div>
              <div className="font-medium">Dev (all)</div>
              <pre className="mt-1 rounded-md bg-muted p-3 overflow-auto"><code>pnpm dev</code></pre>
            </div>
            <div>
              <div className="font-medium">Client only</div>
              <pre className="mt-1 rounded-md bg-muted p-3 overflow-auto"><code>pnpm dev:client</code></pre>
              <div className="mt-1 text-muted-foreground">`http://localhost:3001`</div>
            </div>
            <div>
              <div className="font-medium">API only</div>
              <pre className="mt-1 rounded-md bg-muted p-3 overflow-auto"><code>pnpm dev:api</code></pre>
              <div className="mt-1 text-muted-foreground">
                API: `http://localhost:3000/api/v1` · Swagger: `http://localhost:3000/api/docs`
              </div>
            </div>
          </div>

          <div className="text-muted-foreground">
            More docs:{' '}
            <code className="rounded bg-muted px-1.5 py-0.5">apps/client/PACKAGES.md</code>
          </div>
        </div>
      </section>

      <section id="structure" className="space-y-4">
        <h2 className="text-2xl font-semibold">Repo structure</h2>
        <div className="rounded-2xl border bg-card p-6">
          <pre className="text-sm overflow-auto rounded-md bg-muted p-3"><code>{`fullstack-starter/
├─ apps/
│  ├─ client/   # Next.js
│  └─ api/      # NestJS
├─ packages/
│  ├─ data/     # Schemas (Zod), validators, shared types
│  ├─ ui/       # Shared UI components (optional)
│  ├─ i18n/     # Shared locales
│  ├─ config/   # Config/env validation
│  └─ core/     # Shared constants
└─ tooling/     # ESLint/TS/Prettier/Tailwind configs`}</code></pre>
        </div>
      </section>

      <section id="examples" className="space-y-8">
        <h2 className="text-2xl font-semibold">Minimal examples</h2>

        <div className="grid gap-4">
          <details className="group rounded-2xl border bg-card p-6 open:shadow-sm">
            <summary className="cursor-pointer list-none">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-lg font-semibold">Forms (react-hook-form)</div>
                  <div className="text-sm text-muted-foreground">
                    Typed validation (Zod) + async submit.
                  </div>
                </div>
                <div className="text-sm text-muted-foreground group-open:hidden">Show</div>
                <div className="text-sm text-muted-foreground hidden group-open:block">Hide</div>
              </div>
            </summary>
            <div className="mt-6">
              <FormExample />
            </div>
          </details>

          <details className="group rounded-2xl border bg-card p-6 open:shadow-sm">
            <summary className="cursor-pointer list-none">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-lg font-semibold">Fetching & cache (TanStack Query)</div>
                  <div className="text-sm text-muted-foreground">
                    Queries, dependent query, and a mutation.
                  </div>
                </div>
                <div className="text-sm text-muted-foreground group-open:hidden">Show</div>
                <div className="text-sm text-muted-foreground hidden group-open:block">Hide</div>
              </div>
            </summary>
            <div className="mt-6">
              <QueryExample />
            </div>
          </details>

          <details className="group rounded-2xl border bg-card p-6 open:shadow-sm">
            <summary className="cursor-pointer list-none">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-lg font-semibold">Tables (TanStack Table)</div>
                  <div className="text-sm text-muted-foreground">
                    Sorting, global filter, and pagination.
                  </div>
                </div>
                <div className="text-sm text-muted-foreground group-open:hidden">Show</div>
                <div className="text-sm text-muted-foreground hidden group-open:block">Hide</div>
              </div>
            </summary>
            <div className="mt-6">
              <TableExample />
            </div>
          </details>
        </div>
      </section>
    </main>
  );
}

function Card({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`rounded-2xl border bg-card p-6 ${className ?? ''}`}>
      <div className="text-base font-semibold">{title}</div>
      <div className="mt-3">{children}</div>
    </div>
  );
}
