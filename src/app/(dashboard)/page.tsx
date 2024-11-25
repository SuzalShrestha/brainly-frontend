'use client';
import { AddContentDialog } from '@/components/add-content';
import { Notes } from '@/components/notes';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

export default function Home() {
    const [activeTab, setActiveTab] = useState('all');

    return (
        <div className='flex flex-col gap-6'>
            <div className='flex justify-between items-center'>
                <div className='font-bold text-3xl'>Notes</div>
                <div className='flex gap-4'>
                    <Button variant={'outline'}>
                        <Share2 className='mr-2 h-4 w-4' />
                        Share
                    </Button>
                    <AddContentDialog />
                </div>
            </div>

            <Tabs
                defaultValue='all'
                className='w-full'
                onValueChange={setActiveTab}
            >
                <TabsList>
                    <TabsTrigger value='all'>All Notes</TabsTrigger>
                    <TabsTrigger value='shared'>Favorites</TabsTrigger>
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
