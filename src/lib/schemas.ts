import { z } from 'zod';

export const contentSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
    link: z.string().url().optional().or(z.literal('')),
    tags: z.array(z.string()).default([]),
    type: z.enum(['note', 'link', 'image']).default('note'),
});

export type ContentFormData = z.infer<typeof contentSchema>;
