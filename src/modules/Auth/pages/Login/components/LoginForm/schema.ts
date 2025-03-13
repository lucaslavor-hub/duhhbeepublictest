import { emailSchema, required_error } from '@/utils/schemas';
import { z } from 'zod';

export const LoginFormSchema = z.object({
  email: emailSchema,
  password: z.string({ required_error }).trim().min(6, 'Insira uma senha.'),
});
