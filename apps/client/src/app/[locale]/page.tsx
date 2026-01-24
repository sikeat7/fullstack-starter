import { Suspense } from 'react';

import { ExamplesSection } from '@/components/home/examples-section';
import { HomeHeader } from '@/components/home/header';
import { CardSkeleton } from '@/components/skeletons/card-skeleton';

/**
 * Project welcome page (Server Component).
 * Intended for newcomers: stack, commands, and repo structure.
 * Easy to remove/replace once real product work starts.
 */
export default function HomePage() {
  return (
    <main className="container mx-auto max-w-6xl space-y-12 px-4 py-12">
      <HomeHeader />

      <section id="stack" className="space-y-4">
        <h2 className="text-2xl font-semibold">Stack (high level)</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <InfoCard title="Frontend (apps/client)">
            <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              <li>
                <strong>Next.js</strong> (App Router) + <strong>React</strong>
              </li>
              <li>
                <strong>TypeScript</strong> + ESLint
              </li>
              <li>
                <strong>Tailwind CSS</strong> (+ tailwindcss-animate)
              </li>
              <li>
                <strong>next-intl</strong> (i18n)
              </li>
              <li>
                <strong>TanStack Query</strong> (fetching/cache) + DevTools
              </li>
              <li>
                <strong>TanStack Table</strong> (tables)
              </li>
              <li>
                <strong>nuqs</strong> (type-safe URL state management)
              </li>
              <li>
                <strong>react-hook-form</strong> +{' '}
                <strong>@hookform/resolvers</strong> (forms)
              </li>
              <li>
                <strong>Shadcn UI</strong> + <strong>cva</strong> +{' '}
                <strong>cn()</strong> (styling)
              </li>
            </ul>
          </InfoCard>

          <InfoCard title="Backend (apps/api)">
            <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              <li>
                <strong>NestJS</strong> (API)
              </li>
              <li>
                <strong>Prisma</strong> (ORM)
              </li>
              <li>
                <strong>PostgreSQL</strong> (DB) + <strong>Redis</strong> (local
                infra)
              </li>
              <li>
                <strong>Swagger</strong> (docs)
              </li>
              <li>
                <strong>nestjs-i18n</strong> (i18n en API)
              </li>
              <li>
                <strong>Zod</strong> (validation; shared schemas)
              </li>
            </ul>
          </InfoCard>

          <InfoCard title="Monorepo & tooling" className="md:col-span-2">
            <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              <li>
                <strong>Turborepo</strong> (pipelines/build/lint)
              </li>
              <li>
                <strong>pnpm workspaces</strong> (deps)
              </li>
              <li>
                <strong>ESLint</strong> + <strong>Prettier</strong>
              </li>
              <li>
                <strong>Jest</strong> (testing tooling)
              </li>
              <li>
                Internal packages: <strong>@repo/data</strong>,{' '}
                <strong>@repo/ui</strong>, <strong>@repo/i18n</strong>,{' '}
                <strong>@repo/config</strong>, <strong>@repo/core</strong>
              </li>
            </ul>
          </InfoCard>
        </div>
      </section>

      <section id="getting-started" className="space-y-4">
        <h2 className="text-2xl font-semibold">Getting started</h2>

        <div className="space-y-4 rounded-2xl border bg-card p-6 text-sm">
          <div className="grid gap-3 md:grid-cols-2">
            <CommandBlock title="Install" command="pnpm install" />
            <CommandBlock title="Dev (all)" command="pnpm dev" />
            <CommandBlock
              title="Client only"
              command="pnpm dev:client"
              note="http://localhost:3001"
            />
            <CommandBlock
              title="API only"
              command="pnpm dev:api"
              note="API: http://localhost:3000/api/v1 - Swagger: http://localhost:3000/api/docs"
            />
          </div>

          <div className="text-muted-foreground">
            More docs:{' '}
            <code className="rounded bg-muted px-1.5 py-0.5">
              apps/client/PACKAGES.md
            </code>
          </div>
        </div>
      </section>

      <section id="structure" className="space-y-4">
        <h2 className="text-2xl font-semibold">Repo structure</h2>
        <div className="rounded-2xl border bg-card p-6">
          <pre className="overflow-auto rounded-md bg-muted p-3 text-sm">
            <code>{`fullstack-starter/
├─ apps/
│  ├─ client/   # Next.js
│  └─ api/      # NestJS
├─ packages/
│  ├─ data/     # Schemas (Zod), validators, shared types
│  ├─ ui/       # Shared UI components (optional)
│  ├─ i18n/     # Shared locales
│  ├─ config/   # Config/env validation
│  └─ core/     # Shared constants
└─ tooling/     # ESLint/TS/Prettier/Tailwind configs`}</code>
          </pre>
        </div>
      </section>

      <Suspense fallback={<CardSkeleton className="h-64" />}>
        <ExamplesSection />
      </Suspense>
    </main>
  );
}

function InfoCard({
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

function CommandBlock({
  title,
  command,
  note,
}: {
  title: string;
  command: string;
  note?: string;
}) {
  return (
    <div>
      <div className="font-medium">{title}</div>
      <pre className="mt-1 overflow-auto rounded-md bg-muted p-3">
        <code>{command}</code>
      </pre>
      {note && <div className="mt-1 text-muted-foreground">{note}</div>}
    </div>
  );
}
