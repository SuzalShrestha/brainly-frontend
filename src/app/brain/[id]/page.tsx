'use client';
import { useGetBrainContent } from '@/api/use-get-brain-content';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'motion/react';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Link as LinkIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

export default function BrainPage({ params }: { params: { id: string } }) {
    const { data, error, isLoading } = useGetBrainContent(params.id);
    if (error) {
        if (error?.message) {
            toast.error(error.message);
        } else {
            toast.error('Failed to load shared content');
        }
        return (
            <div className='flex flex-col items-center justify-center p-8 text-muted-foreground'>
                <p>Something went wrong while loading the shared content.</p>
                <Button
                    variant='outline'
                    className='mt-4'
                    onClick={() => window.location.reload()}
                >
                    Try Again
                </Button>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className='container mx-auto py-8'>
                <div className='grid grid-cols-3 gap-4'>
                    {[...Array(6)].map((_, i) => (
                        <BrainContentSkeleton key={i} />
                    ))}
                </div>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className='container mx-auto py-8'>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className='flex flex-col items-center justify-center p-8 text-muted-foreground'
                >
                    <p>No shared content found</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className='container mx-auto py-8'>
            <div className='mb-8'>
                <h1 className='text-3xl font-bold'>Shared Content</h1>
                <p className='text-muted-foreground mt-2'>
                    Viewing shared content from another user
                </p>
            </div>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2 }}
                    className='grid grid-cols-3 gap-4'
                >
                    {data.map((item) => (
                        <BrainContent key={item._id} {...item} />
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

function BrainContentSkeleton() {
    return (
        <Card className='group relative'>
            <CardHeader className='grid gap-4'>
                <div className='flex items-start justify-between space-x-4'>
                    <div className='space-y-2 w-full'>
                        <Skeleton className='h-4 w-3/4' />
                        <Skeleton className='h-3 w-1/4' />
                    </div>
                </div>
            </CardHeader>
            <CardContent className='grid gap-4'>
                <Skeleton className='h-20' />
            </CardContent>
            <CardFooter>
                <div className='flex gap-2'>
                    <Skeleton className='h-6 w-16' />
                    <Skeleton className='h-6 w-16' />
                </div>
            </CardFooter>
        </Card>
    );
}

interface BrainContentProps {
    title: string;
    content: string;
    link?: string;
    tags: string[];
    type: string;
    createdAt: string;
}

function BrainContent({
    title,
    content,
    link,
    tags,
    createdAt: date,
}: BrainContentProps) {
    return (
        <Card className='group relative'>
            <CardHeader className='grid gap-4'>
                <div className='space-y-2'>
                    <h3 className='font-semibold leading-none tracking-tight'>
                        {title}
                    </h3>
                    <div className='flex items-center space-x-1 text-sm text-muted-foreground'>
                        <Calendar className='h-3 w-3' />
                        <time dateTime={date}>
                            {new Date(date).toLocaleDateString()}
                        </time>
                    </div>
                </div>
            </CardHeader>
            <CardContent className='grid gap-4'>
                <div className='line-clamp-3 text-sm text-muted-foreground'>
                    {content}
                </div>
                {link && (
                    <div className='flex items-center space-x-2 text-sm text-blue-600'>
                        <LinkIcon className='h-3 w-3' />
                        <a
                            href={link}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='hover:underline'
                        >
                            {new URL(link).hostname}
                        </a>
                    </div>
                )}
            </CardContent>
            <CardFooter>
                <div className='flex flex-wrap gap-2'>
                    {tags.map((tag) => (
                        <Badge key={tag} variant='secondary'>
                            {tag}
                        </Badge>
                    ))}
                </div>
            </CardFooter>
        </Card>
    );
}
