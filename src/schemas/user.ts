import { z } from 'zod';

export const UserSchema = z
  .object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(5, 'Require minimum of 5 characters'),
    verifyEmail: z.string().email(),
    verifyPassword: z.string().min(5, 'Require minimum of 5 characters'),
  })
  .refine((data) => data.email === data.verifyEmail, {
    message: "Emails don't match",
    path: ['verifyEmail'],
  })
  .refine((data) => data.password === data.verifyPassword, {
    message: "password don't match",
    path: ['verifyPassword'],
  });

export type UserSchemaType = z.infer<typeof UserSchema>;
