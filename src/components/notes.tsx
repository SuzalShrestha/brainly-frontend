'use client';
import {
    Calendar,
    Link as LinkIcon,
    MoreVertical,
    Pencil,
    Share2,
    Star,
} from 'lucide-react';
import { Button } from './ui/button';
import { useGetContent } from '@/api/use-get-content';
import { motion, AnimatePresence } from 'motion/react';
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
import { toast } from 'sonner';
import { Skeleton } from './ui/skeleton';
import { useDeleteContent } from '@/api/use-delete-content';
import { DeleteAlert } from './delete-alert';
import { usePostAddFavorite } from '@/api/use-add-favorite';
import { useSearchParams } from 'next/navigation';

interface NotesProps {
    filter?: 'all' | 'favorites' | 'shared';
}

interface NoteType {
    _id: string;
    title: string;
    content: string;
    link?: string;
    tags: string[];
    type: 'link' | 'video' | 'document' | 'tweet';
    createdAt: string;
    isFavorite?: boolean;
    isShared?: boolean;
}

export function Notes({ filter = 'all' }: NotesProps) {
    const { data, error, isLoading } = useGetContent<NoteType[]>();
    const searchParams = useSearchParams();
    const type = searchParams.get('type');

    if (error) {
        toast.error('Failed to load notes');
        return (
            <div className='flex flex-col items-center justify-center p-8 text-muted-foreground'>
                <p>Something went wrong while loading your notes.</p>
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
            <div className='grid grid-cols-3 gap-4 my-5'>
                {[...Array(6)].map((_, i) => (
                    <NoteSkeleton key={i} />
                ))}
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='flex flex-col items-center justify-center p-8 text-muted-foreground'
            >
                <p>No notes found</p>
                <Button variant='outline' className='mt-4'>
                    Create your first note
                </Button>
            </motion.div>
        );
    }
    const filteredNotes = data.filter((note) => {
        switch (filter) {
            case 'favorites':
                return note.isFavorite;
            case 'shared':
                return note.isShared;
            default:
                return true;
        }
    });
    const filterTypeNotes = filteredNotes.filter((note) => note.type === type);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
                className='grid grid-cols-3 gap-4 my-5'
            >
                {type
                    ? filterTypeNotes.map((note) => (
                          <motion.div
                              key={note._id}
                              layout
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                          >
                              <Note {...note} />
                          </motion.div>
                      ))
                    : filteredNotes.map((note) => (
                          <motion.div
                              key={note._id}
                              layout
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                          >
                              <Note {...note} />
                          </motion.div>
                      ))}
            </motion.div>
        </AnimatePresence>
    );
}

function NoteSkeleton() {
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

interface NoteProps extends NoteType {}

function Note({
    _id,
    title,
    link,
    tags,
    content,
    createdAt: date,
    isFavorite,
}: NoteProps) {
    const { mutate: deleteContent, isPending: isDeleting } = useDeleteContent();
    const { mutate: postAddFavorite, isPending: isAddingFavorite } =
        usePostAddFavorite();
    const handleAction = (action: string) => {
        toast.promise(
            // Simulate API call
            new Promise((resolve) => setTimeout(resolve, 1000)),
            {
                loading: `${action}ing note...`,
                success: `Note ${action.toLowerCase()}d successfully`,
                error: `Failed to ${action.toLowerCase()} note`,
            }
        );
    };
    const handleDelete = () => {
        deleteContent(_id, {
            onSuccess: () => {
                toast.success('Note deleted successfully');
            },
            onError: (error) => {
                toast.error(error.message || 'Failed to delete note');
            },
        });
    };
    const handleAddFavorite = () => {
        postAddFavorite(_id, {
            onSuccess: () => {
                if (isFavorite) {
                    toast.success('Note removed from favorites');
                } else {
                    toast.success('Note added to favorites');
                }
            },
            onError: (error) => {
                toast.error(error.message || 'Failed to add to favorites');
            },
        });
    };

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
                            <DropdownMenuItem
                                onClick={() => handleAction('Edit')}
                            >
                                <Pencil className='mr-2 h-4 w-4' />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => handleAction('Share')}
                            >
                                <Share2 className='mr-2 h-4 w-4' />
                                Share
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={handleAddFavorite}
                                disabled={isAddingFavorite}
                            >
                                <Star className='mr-2 h-4 w-4' />
                                {isFavorite
                                    ? 'Remove from favorites'
                                    : 'Add to favorites'}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <DeleteAlert
                                    onDelete={handleDelete}
                                    isLoading={isDeleting}
                                />
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
