'use client';
import {
    Calendar,
    Link as LinkIcon,
    MoreVertical,
    Pencil,
    Share2,
    Star,
    Trash,
} from 'lucide-react';
import { Button } from './ui/button';
import { useGetContent } from '@/api/use-get-content';
import { motion } from 'motion/react';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from './ui/badge';

interface NotesProps {
    filter?: 'all' | 'favorites' | 'shared';
}

export function Notes({ filter = 'all' }: NotesProps) {
    const { data, error, isLoading } = useGetContent();
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.toString()}</div>;
    if (data?.length === 0) return <div>No notes found</div>;
    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.5 }}
            className='grid grid-cols-3 gap-4 my-5'
        >
            {data?.map((note) => {
                return <Note key={note._id} {...note} />;
            })}
        </motion.div>
    );
}
function Note({ title, link, tags, content, type, createdAt: date }) {
    return (
        <Card className='group relative'>
            <CardHeader className='grid gap-4'>
                <div className='flex items-start justify-between space-x-4'>
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
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant='ghost' className='h-8 w-8 p-0'>
                                <MoreVertical className='h-4 w-4' />
                                <span className='sr-only'>Open menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                            <DropdownMenuItem>
                                <Pencil className='mr-2 h-4 w-4' />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Share2 className='mr-2 h-4 w-4' />
                                Share
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Star className='mr-2 h-4 w-4' />
                                Add to favorites
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className='text-destructive'>
                                <Trash className='mr-2 h-4 w-4' />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
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
