'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

/**
 * React Query provider (TanStack Query)
 *
 * React Query helps with:
 * - Cached data fetching
 * - Server-state synchronization
 * - Background updates
 * - Smart refetching and revalidation
 */
export function QueryProvider({ children }: { children: React.ReactNode }) {
  // Create the QueryClient inside the component so it is unique per session
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Time before data is considered stale
            staleTime: 60 * 1000, // 1 minute
            // Time before cached data is garbage-collected
            gcTime: 5 * 60 * 1000, // 5 minutes (formerly cacheTime)
            // Automatic refetch when the window regains focus
            refetchOnWindowFocus: false,
            // Retry failed requests
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* DevTools in development only */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
