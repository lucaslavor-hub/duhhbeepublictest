import { z } from 'zod';

export const required_error = 'Required field.';
const required_email = 'Enter a valid e-mail.';
export const required_terms = 'Terms must be accepted to proceed.';

export const emailSchema = z.string({ required_error }).trim().email({ message: required_email });

export const passwordComplexitySchema = z
  .string({ required_error })
  .superRefine((password, check) => {
    const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
    const containsLowercase = (ch: string) => /[a-z]/.test(ch);
    const containsSpecialChar = (ch: string) =>
      // eslint-disable-next-line no-useless-escape
      /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);
    let countOfUpperCase = 0,
      countOfLowerCase = 0,
      countOfNumbers = 0,
      countOfSpecialChar = 0;
    for (let i = 0; i < password.length; i++) {
      const ch = password.charAt(i);
      if (!isNaN(+ch)) countOfNumbers++;
      else if (containsUppercase(ch)) countOfUpperCase++;
      else if (containsLowercase(ch)) countOfLowerCase++;
      else if (containsSpecialChar(ch)) countOfSpecialChar++;
    }
    if (
      countOfLowerCase < 1 ||
      countOfUpperCase < 1 ||
      countOfSpecialChar < 1 ||
      countOfNumbers < 1
    ) {
      check.addIssue({
        code: 'custom',
        message:
          'Password must have at least 8 characters, a variety of upper and lower case letters, numbers and special characters.',
      });
    }
  });

export const requiredText = z.string({ required_error }).min(1, { message: 'Enter a valid name' });

export const dateSchema = z.date({ required_error }).refine(
  (date) => {
    const now = new Date();

    return date <= now;
  },
  {
    message: 'The date cannot be in the future',
  },
);
