import { emailSchema } from '@/utils/schemas';
import { z } from 'zod';

export const ForgotPasswordFormSchema = z.object({
  email: emailSchema,
});
