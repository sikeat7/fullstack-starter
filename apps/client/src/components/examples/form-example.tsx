'use client';

import { useState } from 'react';
import { z } from 'zod';

import { createUserSchema } from '@repo/data';

type CreateUserOutput = z.output<typeof createUserSchema>;

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useUserForm } from '@/hooks/use-user-form';

/**
 * Example: React Hook Form + Zod + Shadcn UI
 *
 * This example demonstrates:
 * - Using shared validation schemas from @repo/data
 * - Custom form hooks for reusability
 * - Shadcn Form components for accessible forms
 */
export function FormExample() {
  const [submittedData, setSubmittedData] = useState<CreateUserOutput | null>(null);

  const { form, onSubmit, isSubmitting, reset } = useUserForm({
    onSubmit: async (data) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Submitted data:', data);
      setSubmittedData(data);
    },
  });

  const handleReset = () => {
    reset();
    setSubmittedData(null);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create User</CardTitle>
        <CardDescription>
          Form validation using shared schemas from @repo/data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Min 8 characters"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create User'}
              </Button>
              <Button type="button" variant="outline" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </form>
        </Form>

        {submittedData && (
          <div className="mt-6 rounded-md bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="mb-2 font-semibold">Submitted data:</h3>
            <pre className="overflow-auto text-sm">
              {JSON.stringify(
                { ...submittedData, password: '********' },
                null,
                2
              )}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
