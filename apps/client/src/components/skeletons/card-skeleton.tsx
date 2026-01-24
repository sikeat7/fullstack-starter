import { cn } from '@/lib/utils';

interface CardSkeletonProps {
  className?: string;
}

export function CardSkeleton({ className }: CardSkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-2xl border bg-card p-6',
        className
      )}
    >
      <div className="h-4 w-1/3 rounded bg-muted" />
      <div className="mt-4 space-y-2">
        <div className="h-3 w-full rounded bg-muted" />
        <div className="h-3 w-5/6 rounded bg-muted" />
        <div className="h-3 w-4/6 rounded bg-muted" />
      </div>
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="w-full max-w-md animate-pulse space-y-4">
      <div className="space-y-2">
        <div className="h-4 w-20 rounded bg-muted" />
        <div className="h-10 w-full rounded bg-muted" />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-20 rounded bg-muted" />
        <div className="h-10 w-full rounded bg-muted" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="h-4 w-20 rounded bg-muted" />
          <div className="h-10 w-full rounded bg-muted" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-20 rounded bg-muted" />
          <div className="h-10 w-full rounded bg-muted" />
        </div>
      </div>
      <div className="flex gap-2 pt-4">
        <div className="h-10 w-28 rounded bg-muted" />
        <div className="h-10 w-20 rounded bg-muted" />
      </div>
    </div>
  );
}
