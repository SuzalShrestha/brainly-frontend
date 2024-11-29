import { z } from 'zod';

export const contentSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
    link: z.string().url().optional().or(z.literal('')),
    tags: z.array(z.string()).default([]),
    type: z.enum(['note', 'link', 'image']).default('note'),
});

export type ContentFormData = z.infer<typeof contentSchema>;

export const signupSchema = z
    .object({
        userName: z
            .string()
            .min(2, 'Username must be at least 2 characters')
            .max(50, 'Username must be less than 50 characters')
            .regex(
                /^[a-zA-Z0-9]*$/,
                'Username can only contain letters and numbers'
            ),
        name: z
            .string()
            .min(2, 'Name must be at least 2 characters')
            .max(50, 'Name must be less than 50 characters')
            .regex(/^[a-zA-Z\s]*$/, 'Name can only contain letters and spaces'),
        email: z
            .string()
            .email('Invalid email address')
            .min(5, 'Email must be at least 5 characters')
            .max(100, 'Email must be less than 100 characters'),
        password: z
            .string()
            .min(8, 'Password must be at least 8 characters')
            .max(100, 'Password must be less than 100 characters')
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
            ),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

export type SignupFormData = z.infer<typeof signupSchema>;

export const signupResponseSchema = z.object({
    message: z.string(),
    errors: z.record(z.array(z.string())).optional(),
});

export type SignupResponse = z.infer<typeof signupResponseSchema>;

export const loginSchema = z.object({
    email: z
        .string()
        .email('Invalid email address')
        .min(5, 'Email must be at least 5 characters')
        .max(100, 'Email must be less than 100 characters'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .max(100, 'Password must be less than 100 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
