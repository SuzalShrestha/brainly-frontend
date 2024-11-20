import { Edit, File, Link, Trash } from 'lucide-react';
import { Button } from './ui/button';
import { useGetContent } from '@/api/use-get-content';
export function Notes() {
    const { data, error, isLoading } = useGetContent();
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.toString()}</div>;

    console.log(data);
    return (
        <div className='grid grid-cols-3 gap-4 my-5'>
            {data?.map((note) => {
                return <Note key={note._id} {...note} />;
            })}
        </div>
    );
}
function Note({ title, link, tags, content, type }) {
    return (
        <div className='grid grid-cols-1 grid-row-4 gap-3 p-7 border-gray-500 border-2 h-[400px] '>
            <div className='flex justify-between'>
                <div className='flex font-semibold gap-3 text-xl'>
                    <File size={25} />
                    {title}
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
            <div className='flex gap-3'>{link}</div>
            <div className='row-span-2'>{content}</div>
            <div className='flex '>
                {tags.map((tag) => {
                    return (
                        <div
                            key={tag}
                            className='bg-gray-200 px-2 rounded-full'
                        >
                            {tag}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
