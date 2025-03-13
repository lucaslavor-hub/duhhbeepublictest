import { required_error } from '@/utils/schemas';
import { z } from 'zod';

const numberArray = z.number({ required_error }).array().min(1);
const stringArray = z.string({ required_error }).array().min(1);
const number = z.number({ required_error });
const string = z.string({ required_error });

export const SmartBeeFormSchema = z.object({
  answer: z.union([numberArray, stringArray, number, string]),
});
