'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { createUserSchema } from '@repo/data';

// Use z.input for form state (before parsing/defaults applied)
type CreateUserInput = z.input<typeof createUserSchema>;
// Use z.output (same as z.infer) for the validated data
type CreateUserOutput = z.output<typeof createUserSchema>;

interface UseUserFormOptions {
  defaultValues?: Partial<CreateUserInput>;
  onSubmit?: (data: CreateUserOutput) => Promise<void> | void;
}

interface UseUserFormReturn {
  form: UseFormReturn<CreateUserInput>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isSubmitting: boolean;
  reset: () => void;
}

/**
 * Custom hook for user creation forms
 * Uses shared schema from @repo/data for validation
 */
export function useUserForm({
  defaultValues,
  onSubmit: onSubmitCallback,
}: UseUserFormOptions = {}): UseUserFormReturn {
  const form = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      profilePicture: null,
      role: 'USER',
      ...defaultValues,
    },
    mode: 'onBlur',
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    if (onSubmitCallback) {
      // Data is validated and transformed by the resolver
      await onSubmitCallback(data as CreateUserOutput);
    }
  });

  const reset = () => {
    form.reset();
  };

  return {
    form,
    onSubmit: handleSubmit,
    isSubmitting: form.formState.isSubmitting,
    reset,
  };
}
