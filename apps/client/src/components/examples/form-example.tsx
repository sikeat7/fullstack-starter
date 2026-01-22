'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from '@repo/data'; // ✅ Import Zod from the monorepo shared package
import { useState } from 'react';

/**
 * Example: react-hook-form + Zod validation
 *
 * react-hook-form: High-performance forms with fewer re-renders
 * @hookform/resolvers: Integration with validation libraries
 * zod: Schema validation with TypeScript types (via @repo/data)
 */

// 1) Define a validation schema with Zod
const userSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name cannot exceed 50 characters'),
  email: z.string().email('Invalid email'),
  age: z
    .number({
      required_error: 'Age is required',
      invalid_type_error: 'Age must be a number',
    })
    .min(18, 'You must be at least 18 years old')
    .max(100, 'Invalid age'),
  bio: z.string().min(10, 'Bio must be at least 10 characters').optional(),
});

// 2) Infer the TypeScript type from the schema
type UserFormData = z.infer<typeof userSchema>;

export function FormExample() {
  const [submittedData, setSubmittedData] = useState<UserFormData | null>(null);

  // 3) Initialize the form with react-hook-form
  const {
    register, // Registers inputs
    handleSubmit, // Handles submit
    formState: { errors, isSubmitting }, // Form state
    reset, // Resets the form
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema), // Zod integration
    defaultValues: {
      name: '',
      email: '',
      age: undefined,
      bio: '',
    },
  });

  // 4) Runs when the form is submitted
  const onSubmit = async (data: UserFormData) => {
    // Simulate an async request
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Submitted data:', data);
    setSubmittedData(data);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">React Hook Form + Zod</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Reactive forms with schema validation
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name *
          </label>
          <input
            {...register('name')}
            id="name"
            type="text"
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Jane Doe"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email *
          </label>
          <input
            {...register('email')}
            id="email"
            type="email"
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="jane@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Age */}
        <div>
          <label htmlFor="age" className="block text-sm font-medium mb-1">
            Age *
          </label>
          <input
            {...register('age', { valueAsNumber: true })}
            id="age"
            type="number"
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="25"
          />
          {errors.age && (
            <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
          )}
        </div>

        {/* Bio */}
        <div>
          <label htmlFor="bio" className="block text-sm font-medium mb-1">
            Bio (optional)
          </label>
          <textarea
            {...register('bio')}
            id="bio"
            rows={3}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Tell us about yourself..."
          />
          {errors.bio && (
            <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
          <button
            type="button"
            onClick={() => {
              reset();
              setSubmittedData(null);
            }}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Reset
          </button>
        </div>
      </form>

      {/* Submitted data */}
      {submittedData && (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-md">
          <h3 className="font-semibold mb-2">✅ Submitted data:</h3>
          <pre className="text-sm overflow-auto">
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
