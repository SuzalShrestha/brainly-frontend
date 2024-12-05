'use client';
import { AddContentDialog } from '@/components/add-content';
import { Notes } from '@/components/notes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState, Suspense } from 'react';
import { ShareDialog } from '@/components/share-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { CommandDialogSearch } from '@/components/command-search';

function NotesWithSearch({
    filter,
}: {
    filter: 'all' | 'favorites' | 'shared';
}) {
    return (
        <Suspense
            fallback={
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5'>
                    {[...Array(6)].map((_, i) => (
                        <Skeleton key={i} className='h-[200px]' />
                    ))}
                </div>
            }
        >
            <Notes filter={filter} />
        </Suspense>
    );
}

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState<'all' | 'favorites' | 'shared'>(
        'all'
    );

    return (
        <div className='flex flex-col gap-4 p-2 sm:p-6'>
            {/* Header Section */}
            <div className='flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between'>
                <div className='font-bold text-2xl sm:text-3xl'>Notes</div>

                <div className='flex flex-col sm:flex-row gap-2 sm:items-center'>
                    <div className='w-full sm:w-auto sm:hidden'>
                        <CommandDialogSearch />
                    </div>
                    <div className='flex justify-between sm:justify-start gap-2 mt-2 sm:mt-0'>
                        <ShareDialog />
                        <AddContentDialog />
                    </div>
                </div>
            </div>

            <Tabs
                defaultValue='all'
                className='w-full'
                onValueChange={(value) =>
                    setActiveTab(value as 'all' | 'favorites' | 'shared')
                }
            >
                <div className='overflow-x-auto'>
                    <TabsList className='w-full sm:w-auto flex justify-start sm:inline-flex'>
                        <TabsTrigger
                            value='all'
                            className='flex-1 sm:flex-none'
                        >
                            All Notes
                        </TabsTrigger>
                        <TabsTrigger
                            value='favorites'
                            className='flex-1 sm:flex-none'
                        >
                            Favorites
                        </TabsTrigger>
                        <TabsTrigger
                            value='shared'
                            className='flex-1 sm:flex-none'
                        >
                            Shared
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value='all'>
                    <NotesWithSearch filter='all' />
                </TabsContent>
                <TabsContent value='favorites'>
                    <NotesWithSearch filter='favorites' />
                </TabsContent>
                <TabsContent value='shared'>
                    <NotesWithSearch filter='shared' />
                </TabsContent>
            </Tabs>
        </div>
    );
}
