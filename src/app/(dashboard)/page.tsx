'use client';
import { AddContentDialog } from '@/components/add-content';
import { Notes } from '@/components/notes';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { toast } from 'sonner';

type TabValue = 'all' | 'favorites' | 'shared';

export default function Home() {
    const [activeTab, setActiveTab] = useState<TabValue>('all');

    const handleShare = () => {
        toast.promise(
            // Simulate API call
            new Promise((resolve) => setTimeout(resolve, 1000)),
            {
                loading: 'Preparing share link...',
                success: 'Share link copied to clipboard!',
                error: 'Failed to generate share link',
            }
        );
    };

    return (
        <div className='flex flex-col gap-6'>
            <div className='flex justify-between items-center'>
                <div className='font-bold text-3xl'>Notes</div>
                <div className='flex gap-4'>
                    <Button variant={'outline'} onClick={handleShare}>
                        <Share2 className='mr-2 h-4 w-4' />
                        Share
                    </Button>
                    <AddContentDialog />
                </div>
            </div>

            <Tabs
                defaultValue='all'
                className='w-full'
                onValueChange={(value) => setActiveTab(value as TabValue)}
            >
                <TabsList>
                    <TabsTrigger value='all'>All Notes</TabsTrigger>
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
