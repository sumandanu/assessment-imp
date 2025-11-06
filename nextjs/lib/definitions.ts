import * as z from 'zod';

export const SigninFormSchema = z.object({
    email: z.email({ error: 'Please enter a valid email.' }).trim(),
    password: z
        .string()
        // .min(8, { error: 'Be at least 8 characters long' })
        // .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
        // .regex(/[0-9]/, { error: 'Contain at least one number.' })
        // .regex(/[^a-zA-Z0-9]/, {
        //   error: 'Contain at least one special character.',
        // })
        .trim(),
});

export const SignupFormSchema = z
    .object({
        name: z
            .string()
            .min(2, { error: 'Name must be at least 2 characters long.' })
            .trim(),
        email: z.email({ error: 'Please enter a valid email.' }).trim(),
        password: z
            .string()
            // .min(8, { error: 'Be at least 8 characters long' })
            // .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
            // .regex(/[0-9]/, { error: 'Contain at least one number.' })
            // .regex(/[^a-zA-Z0-9]/, {
            //   error: 'Contain at least one special character.',
            // })
            .trim(),
        password_confirmation: z
            .string()
            // .min(8, { error: 'Be at least 8 characters long' })
            // .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
            // .regex(/[0-9]/, { error: 'Contain at least one number.' })
            // .regex(/[^a-zA-Z0-9]/, {
            //   error: 'Contain at least one special character.',
            // })
            .trim(),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: "Passwords don't match",
        path: ['password_confirmation'],
    });

export type FormState =
    | {
          errors?: {
              name?: string[];
              email?: string[];
              password?: string[];
          };
          message?: string;
      }
    | undefined;

export const PostFormSchema = z.object({
    title: z.string().trim(),
    content: z.string().trim(),
    // author: z.string().trim(),
    category: z.string().trim(),
    // date: z.string().trim(),
});
