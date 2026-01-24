'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import { FormSkeleton } from '@/components/skeletons/card-skeleton';

// Dynamic imports for code-splitting
const FormExample = dynamic(
  () =>
    import('@/components/examples/form-example').then((m) => m.FormExample),
  {
    loading: () => <FormSkeleton />,
    ssr: false,
  }
);

const QueryExample = dynamic(
  () =>
    import('@/components/examples/query-example').then((m) => m.QueryExample),
  {
    loading: () => (
      <div className="flex items-center justify-center p-8 text-muted-foreground">
        Loading query example...
      </div>
    ),
    ssr: false,
  }
);

const TableExample = dynamic(
  () =>
    import('@/components/examples/table-example').then((m) => m.TableExample),
  {
    loading: () => (
      <div className="flex items-center justify-center p-8 text-muted-foreground">
        Loading table example...
      </div>
    ),
    ssr: false,
  }
);

const UsersTableWithFilters = dynamic(
  () =>
    import('@/components/examples/users-table-with-filters').then(
      (m) => m.UsersTableWithFilters
    ),
  {
    loading: () => (
      <div className="flex items-center justify-center p-8 text-muted-foreground">
        Loading filters example...
      </div>
    ),
    ssr: false,
  }
);

interface ExampleCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

function ExampleCard({ title, description, children }: ExampleCardProps) {
  return (
    <details className="group rounded-2xl border bg-card p-6 open:shadow-sm">
      <summary className="cursor-pointer list-none">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-lg font-semibold">{title}</div>
            <div className="text-sm text-muted-foreground">{description}</div>
          </div>
          <div className="text-sm text-muted-foreground group-open:hidden">
            Show
          </div>
          <div className="hidden text-sm text-muted-foreground group-open:block">
            Hide
          </div>
        </div>
      </summary>
      <div className="mt-6">
        <Suspense
          fallback={
            <div className="animate-pulse text-muted-foreground">
              Loading...
            </div>
          }
        >
          {children}
        </Suspense>
      </div>
    </details>
  );
}

export function ExamplesSection() {
  return (
    <section id="examples" className="space-y-8">
      <h2 className="text-2xl font-semibold">Minimal examples</h2>

      <div className="grid gap-4">
        <ExampleCard
          title="URL State Management (nuqs)"
          description="Type-safe query params with filters, pagination and search (debounced)."
        >
          <UsersTableWithFilters />
        </ExampleCard>

        <ExampleCard
          title="Forms (react-hook-form)"
          description="Typed validation (Zod) + async submit."
        >
          <FormExample />
        </ExampleCard>

        <ExampleCard
          title="Fetching & cache (TanStack Query)"
          description="Queries, dependent query, and a mutation."
        >
          <QueryExample />
        </ExampleCard>

        <ExampleCard
          title="Tables (TanStack Table)"
          description="Sorting, global filter, and pagination."
        >
          <TableExample />
        </ExampleCard>
      </div>
    </section>
  );
}
