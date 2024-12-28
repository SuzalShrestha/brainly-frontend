import { usePostAddFavorite } from '@/api/use-add-favorite';
import { NoteType } from '@/types/notes';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Share2, Star, Calendar, Circle, Link as LinkIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
function DetailedNote({ note }: { note: NoteType }) {
    const { mutate: postAddFavorite } = usePostAddFavorite();
    const handleShare = async () => {};

    return (
        <div className='flex flex-col h-full justify-center mt-5'>
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
            {/* Footer - when was laast editted*/}
            <div className='flex-none border-t'>
                <div className='flex items-center justify-between px-6 py-6'>
                    <div className='flex items-center gap-2'>
                        <Circle className='h-3 w-3 text-muted-foreground' />
                        <span className='text-sm text-muted-foreground'>
                            Last edited on{' '}
                            {new Date(note.updatedAt).toLocaleDateString(
                                undefined,
                                {
                                    month: 'long',
                                    day: 'numeric',
                                }
                            )}
                        </span>
                        {note.isShared ? (
                            <Badge
                                variant='outline'
                                className='capitalize px-2.5 py-0.5'
                            >
                                public
                            </Badge>
                        ) : (
                            <Badge
                                variant='outline'
                                className='capitalize px-2.5 py-0.5'
                            >
                                private
                            </Badge>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default DetailedNote;
