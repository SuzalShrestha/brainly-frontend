'use client';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contentSchema, type ContentFormData } from '@/lib/schemas';
import { usePostContent } from '@/api/use-post-content';
import { toast } from 'sonner';
import { useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export function AddContentDialog() {
    const [open, setOpen] = useState(false);
    const { mutate, isPending: isLoading } = usePostContent();
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<ContentFormData>({
        resolver: zodResolver(contentSchema),
        defaultValues: {
            type: 'link',
            tags: [],
        },
    });

    const onSubmit = (data: ContentFormData) => {
        toast.promise(
            new Promise((resolve, reject) => {
                mutate(data, {
                    onSuccess: () => {
                        reset();
                        setOpen(false);
                        resolve(true);
                    },
                    onError: (error) => {
                        reject(error);
                    },
                });
            }),
            {
                loading: 'Adding content...',
                success: 'Content added successfully!',
                error: 'Failed to add content',
            }
        );
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className='mr-2 h-4 w-4' />
                    Add Content
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>Add Content</DialogTitle>
                        <DialogDescription>
                            Add a new note, link, or image to your collection.
                        </DialogDescription>
                    </DialogHeader>
                    <div className='grid gap-4 py-4'>
                        <div className='grid gap-2'>
                            <Label htmlFor='type'>Type</Label>
                            <Select
                                onValueChange={(value) =>
                                    setValue(
                                        'type',
                                        value as ContentFormData['type']
                                    )
                                }
                                defaultValue='link'
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder='Select type' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='video'>Video</SelectItem>
                                    <SelectItem value='link'>Link</SelectItem>
                                    <SelectItem value='tweet'>Tweet</SelectItem>
                                    <SelectItem value='document'>
                                        Document
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className='grid gap-2'>
                            <Label htmlFor='title'>Title</Label>
                            <Input
                                id='title'
                                {...register('title')}
                                className={errors.title ? 'border-red-500' : ''}
                            />
                            {errors.title && (
                                <p className='text-sm text-red-500'>
                                    {errors.title.message}
                                </p>
                            )}
                        </div>
                        <div className='grid gap-2'>
                            <Label htmlFor='content'>Content</Label>
                            <Textarea
                                id='content'
                                {...register('content')}
                                className={
                                    errors.content ? 'border-red-500' : ''
                                }
                            />
                            {errors.content && (
                                <p className='text-sm text-red-500'>
                                    {errors.content.message}
                                </p>
                            )}
                        </div>
                        <div className='grid gap-2'>
                            <Label htmlFor='link'>Link (optional)</Label>
                            <Input
                                id='link'
                                type='url'
                                {...register('link')}
                                className={errors.link ? 'border-red-500' : ''}
                            />
                            {errors.link && (
                                <p className='text-sm text-red-500'>
                                    {errors.link.message}
                                </p>
                            )}
                        </div>
                        <div className='grid gap-2'>
                            <Label htmlFor='tags'>Tags (comma separated)</Label>
                            <Input
                                id='tags'
                                placeholder='tag1, tag2, tag3'
                                onChange={(e) => {
                                    const tags = e.target.value
                                        .split(',')
                                        .map((tag) => tag.trim())
                                        .filter(Boolean);
                                    setValue('tags', tags);
                                }}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type='submit' disabled={isLoading}>
                            {isLoading ? 'Adding...' : 'Add Content'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
