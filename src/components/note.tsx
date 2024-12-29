import { NoteType } from '@/types/notes';
import { useState } from 'react';
import { useDeleteContent } from '@/api/use-delete-content';
import { useUpdateContent } from '@/api/use-update-content';
import { usePostAddFavorite } from '@/api/use-add-favorite';
import { toast } from 'sonner';
import { MoreVertical, Pencil, Check, X } from 'lucide-react';
import { LinkIcon } from './ui/link';
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
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { DeleteAlert } from './delete-alert';
import { SparklesIcon } from './ui/sparkles';
import { CalendarCogIcon } from './ui/calendar-cog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { noteFormSchema } from '@/lib/schemas';
import type { z } from 'zod';

type FormData = z.infer<typeof noteFormSchema>;

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
    const [isEditing, setIsEditing] = useState(false);

    const form = useForm<FormData>({
        resolver: zodResolver(noteFormSchema),
        defaultValues: {
            title,
            content,
            link: link || '',
            tags: tags.join(', '),
        },
    });

    const { mutate: deleteContent, isPending: isDeleting } = useDeleteContent();
    const { mutate: postAddFavorite, isPending: isAddingFavorite } =
        usePostAddFavorite();
    const { mutate: updateContent, isPending: isUpdating } = useUpdateContent();

    const handleUpdate = (data: FormData) => {
        const updatedTags = data.tags
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean);

        updateContent(
            {
                _id,
                title: data.title,
                content: data.content,
                link: data.link || undefined,
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
        form.reset();
        setIsEditing(false);
    };

    return (
        <Card className='group relative hover:shadow-lg transition-shadow'>
            <CardHeader className='grid gap-4'>
                <div className='flex items-start justify-between space-x-4'>
                    <div className='space-y-2 w-full'>
                        {isEditing ? (
                            <form onSubmit={form.handleSubmit(handleUpdate)}>
                                <Input
                                    {...form.register('title')}
                                    className='font-semibold'
                                    placeholder='Title'
                                />
                                {form.formState.errors.title && (
                                    <p className='text-sm text-red-500'>
                                        {form.formState.errors.title.message}
                                    </p>
                                )}
                            </form>
                        ) : (
                            <h3 className='font-semibold leading-none tracking-tight'>
                                {title}
                            </h3>
                        )}
                        <div className='flex items-center space-x-1 text-sm text-muted-foreground'>
                            <CalendarCogIcon />
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
                                onClick={form.handleSubmit(handleUpdate)}
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
                                    <SparklesIcon />
                                    {isFavorite
                                        ? 'Remove favorite'
                                        : 'Add to favorite'}
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
                    <form className='space-y-4'>
                        <div>
                            <Textarea
                                {...form.register('content')}
                                className='min-h-[100px]'
                                placeholder='Content'
                            />
                            {form.formState.errors.content && (
                                <p className='text-sm text-red-500'>
                                    {form.formState.errors.content.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Input
                                {...form.register('link')}
                                placeholder='Link (optional)'
                                type='url'
                            />
                            {form.formState.errors.link && (
                                <p className='text-sm text-red-500'>
                                    {form.formState.errors.link.message}
                                </p>
                            )}
                        </div>
                    </form>
                ) : (
                    <>
                        <div className='line-clamp-3 text-sm text-muted-foreground'>
                            {content}
                        </div>
                        {link && (
                            <div className='flex items-center space-x-2 text-sm text-blue-600'>
                                <LinkIcon />
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
                            {...form.register('tags')}
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
export default Note;
