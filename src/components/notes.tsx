import { Edit, File, Link, Trash } from 'lucide-react';
import { Button } from './ui/button';

export function Notes() {
    return (
        <div className='grid grid-cols-3 gap-4 my-5'>
            <div className='grid grid-cols-1 grid-row-4 gap-3 p-7 border-gray-500 border-2 h-[400px] '>
                <div className='flex justify-between'>
                    <div className='flex font-semibold gap-3 text-xl'>
                        <File size={25} />
                        title
                    </div>
                    <div className='flex gap-1'>
                        <Button variant={'outline'}>
                            <Link size={14} />
                        </Button>
                        <Button variant={'outline'}>
                            <Edit size={14} />
                        </Button>
                        <Button variant={'outline'}>
                            <Trash size={14} />
                        </Button>
                    </div>
                </div>
                <div className='row-span-2'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
                    perspiciatis minima fugit cupiditate sapiente harum
                    doloremque porro? Quaerat sed, magni aut, dolores voluptatem
                    alias saepe vel vero consectetur voluptates impedit?
                </div>
                <div className='flex '>#tags</div>
            </div>
        </div>
    );
}
