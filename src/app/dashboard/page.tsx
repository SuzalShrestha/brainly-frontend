'use client';
import { AddContentDialog } from '@/components/add-content';
import { Notes } from '@/components/notes';
import { ShareDialog } from '@/components/share-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/dist/client/components/navigation';
import { useState } from 'react';
type TabValue = 'all' | 'favorites' | 'shared';

export default function Home() {
    const [activeTab, setActiveTab] = useState<TabValue>('all');
    const router = useRouter();
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
                onValueChange={(value) => setActiveTab(value as TabValue)}
            >
                <TabsList>
                    <TabsTrigger
                        value='all'
                        onClick={() => router.push('/dashboard')}
                    >
                        All Notes
                    </TabsTrigger>
                    <TabsTrigger value='shared'>Shared</TabsTrigger>
                    <TabsTrigger value='favorites'>Favorites</TabsTrigger>
                </TabsList>
                <TabsContent value='all'>
                    <Notes filter='all' />
                </TabsContent>
                <TabsContent value='favorites'>
                    <Notes filter='favorites' />
                </TabsContent>
                <TabsContent value='shared'>
                    <Notes filter='shared' />
                </TabsContent>
            </Tabs>
        </div>
    );
}
