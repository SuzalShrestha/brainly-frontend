'use client';
import { Notes } from '@/components/notes';
import { Button } from '@/components/ui/button';
import { Plus, Share2 } from 'lucide-react';
import { signIn } from 'next-auth/react';

export default function Home() {
    return (
        <div className='flex flex-col '>
            <div className='flex justify-between items-center  '>
                <div className='font-bold text-3xl'>All Notes</div>
                <div className='flex gap-10'>
                    <Button onClick={() => signIn('credentials')}>
                        <Share2 />
                        SignIn
                    </Button>
                    <Button>
                        <Plus /> Get Content
                    </Button>
                </div>
            </div>
            <Notes />
        </div>
    );
}
