'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

/**
 * Example: @tanstack/react-query (TanStack Query)
 *
 * React Query handles:
 * - Data fetching with smart caching
 * - Loading/error/success states
 * - Automatic refetching
 * - Optimistic updates
 * - Cache invalidation and synchronization
 */

// Example types
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// Demo API (JSONPlaceholder)
const API_URL = 'https://jsonplaceholder.typicode.com';

// Fetching helpers
async function fetchPosts(): Promise<Post[]> {
  const response = await fetch(`${API_URL}/posts?_limit=5`);
  if (!response.ok) throw new Error('Failed to load posts');
  return response.json();
}

async function fetchPost(id: number): Promise<Post> {
  const response = await fetch(`${API_URL}/posts/${id}`);
  if (!response.ok) throw new Error('Failed to load post');
  return response.json();
}

async function createPost(post: Omit<Post, 'id'>): Promise<Post> {
  const response = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  });
  if (!response.ok) throw new Error('Failed to create post');
  return response.json();
}

export function QueryExample() {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const queryClient = useQueryClient();

  // 1) useQuery - Read data
  const {
    data: posts,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['posts'], // Unique query key
    queryFn: fetchPosts, // Fetch function
    staleTime: 30000, // Fresh for 30 seconds
    // gcTime: 5 * 60 * 1000, // Cache GC time (default)
  });

  // 2) Dependent query - Runs only when an ID is selected
  const {
    data: selectedPost,
    isLoading: isLoadingPost,
  } = useQuery({
    queryKey: ['post', selectedPostId], // Dynamic query key
    queryFn: () => fetchPost(selectedPostId!),
    enabled: !!selectedPostId, // Only run when we have an ID
  });

  // 3) useMutation - Write data
  const createMutation = useMutation({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      console.log('Created post:', newPost);
    },
    onError: (error) => {
      console.error('Failed to create post:', error);
    },
  });

  const handleCreatePost = () => {
    createMutation.mutate({
      title: 'New post from React Query',
      body: 'This post was created using useMutation',
      userId: 1,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">TanStack Query (React Query)</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Data fetching with smart caching and synchronization
        </p>
      </div>

      {/* Posts list */}
      <div className="space-y-4">
        <div className="flex gap-2 items-center">
          <h3 className="text-xl font-semibold">Posts</h3>
          <button
            onClick={() => refetch()}
            className="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            🔄 Refetch
          </button>
        </div>

        {/* Loading / error states */}
        {isLoading && (
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded">
            <p className="text-blue-700 dark:text-blue-300">Loading posts...</p>
          </div>
        )}

        {isError && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded">
            <p className="text-red-700 dark:text-red-300">
              ❌ Error: {error.message}
            </p>
          </div>
        )}

        {/* Posts */}
        {posts && (
          <div className="space-y-2">
            {posts.map((post) => (
              <div
                key={post.id}
                onClick={() => setSelectedPostId(post.id)}
                className={`p-3 border rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition ${
                  selectedPostId === post.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
              >
                <h4 className="font-semibold">{post.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                  {post.body}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Selected post */}
      {selectedPostId && (
        <div className="p-4 border-2 border-blue-500 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Selected post</h3>
          {isLoadingPost ? (
            <p className="text-gray-600">Loading details...</p>
          ) : selectedPost ? (
            <div>
              <h4 className="font-semibold text-lg mb-2">{selectedPost.title}</h4>
              <p className="text-gray-700 dark:text-gray-300">{selectedPost.body}</p>
              <p className="text-sm text-gray-500 mt-2">User ID: {selectedPost.userId}</p>
            </div>
          ) : null}
        </div>
      )}

      {/* Mutation */}
      <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">useMutation - Create post</h3>
        <button
          onClick={handleCreatePost}
          disabled={createMutation.isPending}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
        >
          {createMutation.isPending ? 'Creating...' : '➕ Create post'}
        </button>

        {createMutation.isSuccess && (
          <div className="mt-2 p-2 bg-green-100 dark:bg-green-900/30 rounded">
            <p className="text-green-700 dark:text-green-300">
              ✅ Post created successfully! ID: {createMutation.data.id}
            </p>
          </div>
        )}

        {createMutation.isError && (
          <div className="mt-2 p-2 bg-red-100 dark:bg-red-900/30 rounded">
            <p className="text-red-700 dark:text-red-300">
              ❌ Error: {createMutation.error.message}
            </p>
          </div>
        )}
      </div>

      {/* Extra info */}
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded text-sm">
        <h4 className="font-semibold mb-2">💡 React Query highlights:</h4>
        <ul className="space-y-1 list-disc list-inside">
          <li>Automatic query caching</li>
          <li>Background revalidation</li>
          <li>Refetch on window focus</li>
          <li>Loading, error and success states</li>
          <li>Mutations for writes</li>
          <li>DevTools enabled (open the floating widget)</li>
        </ul>
      </div>
    </div>
  );
}
