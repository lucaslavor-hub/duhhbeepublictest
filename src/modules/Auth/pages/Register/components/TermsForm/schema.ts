import { required_terms } from '@/utils/schemas';
import { z } from 'zod';

export const TermsFormSchema = z.object({
  terms: z.literal<boolean>(true, { required_error: required_terms }),
});
