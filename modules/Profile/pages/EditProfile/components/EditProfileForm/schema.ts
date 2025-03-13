import { dateSchema, requiredText } from '@/utils/schemas';
import { z } from 'zod';

export const editProfileFormSchema = z.object({
  dateOfBirth: dateSchema,
  country: requiredText,
  name: requiredText,
});
