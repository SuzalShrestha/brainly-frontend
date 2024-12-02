'use client';
import { AddContentDialog } from '@/components/add-content';
import { Notes } from '@/components/notes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState, Suspense } from 'react';
import { ShareDialog } from '@/components/share-dialog';
import { Skeleton } from '@/components/ui/skeleton';

function NotesWithSearch({
    filter,
}: {
    filter: 'all' | 'favorites' | 'shared';
}) {
    return (
        <Suspense
            fallback={
                <div className='grid grid-cols-3 gap-4 my-5'>
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [activeTab, setActiveTab] = useState<'all' | 'favorites' | 'shared'>(
        'all'
    );

    return (
        <div className='flex flex-col gap-6'>
            <div className='flex justify-between items-center'>
                <div className='font-bold text-3xl'>Notes</div>
                <div className='flex gap-4'>
                    <ShareDialog />
                    <AddContentDialog />
                </div>
            </div>

            <Tabs
                defaultValue='all'
                className='w-full'
                onValueChange={(value) =>
                    setActiveTab(value as 'all' | 'favorites' | 'shared')
                }
            >
                <TabsList>
                    <TabsTrigger value='all'>All Notes</TabsTrigger>
                    <TabsTrigger value='favorites'>Favorites</TabsTrigger>
                    <TabsTrigger value='shared'>Shared</TabsTrigger>
                </TabsList>
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
