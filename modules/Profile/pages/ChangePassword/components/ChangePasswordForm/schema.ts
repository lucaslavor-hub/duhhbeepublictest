import { passwordComplexitySchema, required_error } from '@/utils/schemas';
import { z } from 'zod';

export const changePasswordSchema = z
  .object({
    currentPassword: z.string({ required_error }).min(6, { message: 'Enter a valid password' }),
    newPassword: passwordComplexitySchema,
    confirmPassword: passwordComplexitySchema,
  })
  .superRefine(({ newPassword, confirmPassword }, ctx) => {
    if (newPassword !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      });
    }
  });
