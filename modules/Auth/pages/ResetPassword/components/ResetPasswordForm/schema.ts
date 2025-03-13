import { passwordComplexitySchema } from '@/utils/schemas';
import { z } from 'zod';

export const ResetPasswordSchema = z
  .object({
    code: z.string().length(6),
    password: passwordComplexitySchema,
    passwordConfirmation: passwordComplexitySchema,
  })
  .superRefine(({ password, passwordConfirmation }, ctx) => {
    if (password !== passwordConfirmation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['passwordConfirmation'],
      });
    }
  });
