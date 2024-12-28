'use client';
import { Button } from './ui/button';
import { useGetContent } from '@/api/use-get-content';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Sheet, SheetContent } from './ui/sheet';
import { NoteType, NotesProps } from '@/types/notes';
import Note from './note';
import DetailedNote from './detailed-note';
import NoteSkeleton from './note-skeleton';
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
