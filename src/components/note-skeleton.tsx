import { Skeleton } from './ui/skeleton';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
function NoteSkeleton() {
    return (
        <Card className='group relative'>
            <CardHeader className='grid gap-4 p-4 sm:p-6'>
                <div className='flex items-start justify-between space-x-4'>
                    <div className='space-y-2 w-full'>
                        <Skeleton className='h-4 w-3/4' />
                        <Skeleton className='h-3 w-1/4' />
                    </div>
                </div>
            </CardHeader>
            <CardContent className='grid gap-4 px-4 sm:px-6'>
                <Skeleton className='h-20' />
            </CardContent>
            <CardFooter className='px-4 sm:px-6'>
                <div className='flex gap-2'>
                    <Skeleton className='h-6 w-16' />
                    <Skeleton className='h-6 w-16' />
                </div>
            </CardFooter>
        </Card>
    );
}

export default NoteSkeleton;
