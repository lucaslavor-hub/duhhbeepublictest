import { emailSchema, passwordComplexitySchema } from '@/utils/schemas';
import { z } from 'zod';

export const CredentialsStepFormSchema = z
  .object({
    email: emailSchema,
    password: passwordComplexitySchema,
    confirmPassword: passwordComplexitySchema,
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      });
    }
  });
