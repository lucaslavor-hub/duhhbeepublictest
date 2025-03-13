import { dateSchema, requiredText } from '@/utils/schemas';
import { z } from 'zod';

export const BirthStepFormSchema = z.object({
  birthDate: dateSchema,
  country: requiredText,
});
