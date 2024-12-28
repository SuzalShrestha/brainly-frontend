import { NoteType } from '@/types/notes';
import { useState } from 'react';
import { useDeleteContent } from '@/api/use-delete-content';
import { useUpdateContent } from '@/api/use-update-content';
import { usePostAddFavorite } from '@/api/use-add-favorite';
import { toast } from 'sonner';
import {
    MoreVertical,
    Pencil,
    Star,
    Link as LinkIcon,
    Calendar,
    Check,
    X,
} from 'lucide-react';
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
    //removing note click functionality
    // const handleNoteClick = () => {
    //     const newSearchParams = new URLSearchParams(searchParams);
    //     newSearchParams.set('note', _id);
    //     router.push(`${pathname}?${newSearchParams.toString()}`);
    // };

    return (
        <Card
            className='group relative hover:shadow-lg transition-shadow'
            // onClick={handleNoteClick}
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
export default Note;
