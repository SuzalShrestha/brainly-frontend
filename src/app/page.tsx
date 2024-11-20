import { Notes } from '@/components/notes';
import { Button } from '@/components/ui/button';
import { Plus, Share2 } from 'lucide-react';

export default function Home() {
    return (
        <div className='flex flex-col '>
            <div className='flex justify-between items-center  '>
                <div className='font-bold text-3xl'>All Notes</div>
                <div className='flex gap-10'>
                    <Button>
                        <Share2 />
                        Share
                    </Button>
                    <Button>
                        <Plus /> Add Content
                    </Button>
                </div>
            </div>
            <Notes />
        </div>
    );
}
