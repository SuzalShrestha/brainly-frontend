'use client';
import {
    Calendar,
    Circle,
    Link as LinkIcon,
    MoreVertical,
    Pencil,
    Star,
    Trash2,
    Share2,
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
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { useUpdateContent } from '@/api/use-update-content';
import { Textarea } from './ui/textarea';
import { Check, X } from 'lucide-react';
import { Input } from './ui/input';
import { Sheet, SheetContent } from './ui/sheet';
import { cn } from '@/lib/utils';

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
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const type = searchParams.get('type');
    const selectedNoteId = searchParams.get('note');
    const { data, error, isLoading } = useGetContent<NoteType[]>();

    const closeNotePanel = () => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.delete('note');
        router.push(`${pathname}?${newSearchParams.toString()}`);
    };

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
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5'>
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

    const selectedNote = data?.find((note) => note._id === selectedNoteId);

    return (
        <>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2 }}
                    className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5'
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

            <Sheet open={!!selectedNoteId} onOpenChange={closeNotePanel}>
                <SheetContent
                    className='w-full sm:max-w-[350px] p-0 overflow-y-auto'
                    closeButtonClassName='right-6'
                >
                    <div className='h-full'>
                        {selectedNote && <DetailedNote note={selectedNote} />}
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
}

function NoteSkeleton() {
    return (
        <Card className='group relative'>
            <CardHeader className='grid gap-4 p-4 sm:p-6'>
                <div className='flex items-start justify-between space-x-4'>
                    <div className='space-y-2 w-full'>
                        <Skeleton className='h-4 w-3/4' />
                        <Skeleton className='h-3 w-1/4' />
                    </div>
                </div>
            </CardHeader>
            <CardContent className='grid gap-4 px-4 sm:px-6'>
                <Skeleton className='h-20' />
            </CardContent>
            <CardFooter className='px-4 sm:px-6'>
                <div className='flex gap-2'>
                    <Skeleton className='h-6 w-16' />
                    <Skeleton className='h-6 w-16' />
                </div>
            </CardFooter>
        </Card>
    );
}

function Note({
    _id,
    title,
    link,
    tags,
    content,
    createdAt: date,
    isFavorite,
    type,
}: NoteType) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedContent, setEditedContent] = useState(content);
    const [editedLink, setEditedLink] = useState(link || '');
    const [editedTags, setEditedTags] = useState(tags.join(', '));

    const { mutate: deleteContent, isPending: isDeleting } = useDeleteContent();
    const { mutate: postAddFavorite, isPending: isAddingFavorite } =
        usePostAddFavorite();
    const { mutate: updateContent, isPending: isUpdating } = useUpdateContent();

    const handleUpdate = () => {
        const updatedTags = editedTags
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean);

        updateContent(
            {
                _id,
                title: editedTitle,
                content: editedContent,
                link: editedLink || undefined,
                tags: updatedTags,
                type,
            },
            {
                onSuccess: () => {
                    setIsEditing(false);
                    toast.success('Note updated successfully');
                },
                onError: (error) => {
                    toast.error(error.message || 'Failed to update note');
                },
            }
        );
    };

    const handleCancel = () => {
        setEditedTitle(title);
        setEditedContent(content);
        setEditedLink(link || '');
        setEditedTags(tags.join(', '));
        setIsEditing(false);
    };

    const handleNoteClick = () => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('note', _id);
        router.push(`${pathname}?${newSearchParams.toString()}`);
    };

    return (
        <Card
            className='group relative hover:shadow-lg transition-shadow cursor-pointer'
            onClick={handleNoteClick}
        >
            <CardHeader className='grid gap-4'>
                <div className='flex items-start justify-between space-x-4'>
                    <div className='space-y-2 w-full'>
                        {isEditing ? (
                            <Input
                                value={editedTitle}
                                onChange={(e) => setEditedTitle(e.target.value)}
                                className='font-semibold'
                                placeholder='Title'
                            />
                        ) : (
                            <h3 className='font-semibold leading-none tracking-tight'>
                                {title}
                            </h3>
                        )}
                        <div className='flex items-center space-x-1 text-sm text-muted-foreground'>
                            <Calendar className='h-3 w-3' />
                            <time dateTime={date}>
                                {new Date(date).toLocaleDateString()}
                            </time>
                        </div>
                    </div>
                    {isEditing ? (
                        <div className='flex gap-2'>
                            <Button
                                variant='outline'
                                size='icon'
                                onClick={handleCancel}
                                disabled={isUpdating}
                            >
                                <X className='h-4 w-4' />
                            </Button>
                            <Button
                                variant='outline'
                                size='icon'
                                onClick={handleUpdate}
                                disabled={isUpdating}
                            >
                                <Check className='h-4 w-4' />
                            </Button>
                        </div>
                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant='ghost' className='h-8 w-8 p-0'>
                                    <MoreVertical className='h-4 w-4' />
                                    <span className='sr-only'>Open menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end'>
                                <DropdownMenuItem
                                    onClick={() => setIsEditing(true)}
                                >
                                    <Pencil className='mr-2 h-4 w-4' />
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => postAddFavorite(_id)}
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
                                        onDelete={() => deleteContent(_id)}
                                        isLoading={isDeleting}
                                    />
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </CardHeader>
            <CardContent className='grid gap-4'>
                {isEditing ? (
                    <>
                        <Textarea
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            className='min-h-[100px]'
                            placeholder='Content'
                        />
                        <Input
                            value={editedLink}
                            onChange={(e) => setEditedLink(e.target.value)}
                            placeholder='Link (optional)'
                            type='url'
                        />
                    </>
                ) : (
                    <>
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
                    </>
                )}
            </CardContent>
            <CardFooter>
                <div className='flex flex-wrap gap-2 w-full'>
                    {isEditing ? (
                        <Input
                            value={editedTags}
                            onChange={(e) => setEditedTags(e.target.value)}
                            placeholder='Tags (comma separated)'
                        />
                    ) : (
                        tags.map((tag) => (
                            <Badge key={tag} variant='secondary'>
                                {tag}
                            </Badge>
                        ))
                    )}
                </div>
            </CardFooter>
        </Card>
    );
}

function DetailedNote({ note }: { note: NoteType }) {
    const { mutate: postAddFavorite } = usePostAddFavorite();

    const handleShare = async () => {};

    return (
        <div className='flex flex-col h-full'>
            {/* Header */}
            <div className='flex-none border-b'>
                <div className='flex-col px-6 py-6'>
                    <div className='flex gap-20'>
                        <h2 className='text-2xl font-semibold tracking-tight mb-2'>
                            {note.title}
                        </h2>
                        <div className='flex items-center gap-2'>
                            <Button
                                variant='ghost'
                                size='icon'
                                className='h-9 w-9 hover:bg-muted/60'
                                onClick={() => postAddFavorite(note._id)}
                            >
                                <Star
                                    className={cn(
                                        'h-4 w-4',
                                        note.isFavorite &&
                                            'fill-current text-yellow-400'
                                    )}
                                />
                            </Button>
                            <Button
                                variant='ghost'
                                size='icon'
                                className='h-9 w-9 hover:bg-muted/60'
                                onClick={handleShare}
                            >
                                <Share2 className='h-4 w-4' />
                            </Button>
                        </div>
                    </div>
                    <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                        <Calendar className='h-4 w-4' />
                        <time dateTime={note.createdAt}>
                            {new Date(note.createdAt).toLocaleDateString(
                                undefined,
                                {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                }
                            )}
                        </time>
                        <Badge
                            variant='outline'
                            className='capitalize px-2.5 py-0.5'
                        >
                            {note.type}
                        </Badge>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className='flex-1 overflow-y-auto'>
                <div className='px-6 py-6 space-y-6'>
                    <div className='prose prose-sm dark:prose-invert max-w-none'>
                        <p className='text-base leading-relaxed whitespace-pre-wrap'>
                            {note.content}
                        </p>
                    </div>

                    {note.link && (
                        <a
                            href={note.link}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors group'
                        >
                            <LinkIcon className='h-4 w-4 transition-transform group-hover:-rotate-12' />
                            <span className='underline-offset-4 hover:underline'>
                                {new URL(note.link).hostname}
                            </span>
                        </a>
                    )}

                    {note.tags.length > 0 && (
                        <div className='flex flex-wrap gap-2 pt-2'>
                            {note.tags.map((tag) => (
                                <Badge
                                    key={tag}
                                    variant='secondary'
                                    className='px-2.5 py-0.5 text-sm'
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
