import { requiredText } from '@/utils/schemas';
import { z } from 'zod';

export const NameStepFormSchema = z.object({
  name: requiredText,
});
