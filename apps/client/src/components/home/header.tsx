import { Button } from '@/components/ui/button';

const techTags = [
  'Next.js',
  'NestJS',
  'Prisma',
  'Turborepo',
  'TypeScript',
];

/**
 * Server component for the home page header
 * No client-side interactivity needed here
 */
export function HomeHeader() {
  return (
    <header className="relative overflow-hidden rounded-2xl border bg-card p-8 md:p-10">
      <div className="pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_60%)]">
        <div className="absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500/30 via-purple-500/25 to-pink-500/20 blur-3xl" />
      </div>

      <div className="relative space-y-5">
        <div className="flex flex-wrap gap-2 text-xs">
          {techTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full border bg-background px-2.5 py-1 text-muted-foreground"
            >
              {tag}
            </span>
          ))}
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
  );
}
