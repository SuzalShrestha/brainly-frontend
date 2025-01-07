'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LogIn, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LogoutSuccessPage() {
    const router = useRouter();

    return (
        <div className='min-h-screen flex items-center justify-center bg-background p-4'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className='w-[380px] p-6 text-center space-y-6'>
                    <div className='space-y-2'>
                        <h1 className='text-2xl font-semibold tracking-tight'>
                            Logged Out Successfully
                        </h1>
                        <p className='text-sm text-muted-foreground'>
                            Thank you for using our application
                        </p>
                    </div>
                    <div className='space-y-3'>
                        <Button
                            className='w-full'
                            onClick={() => router.push('/login')}
                        >
                            <LogIn className='mr-2 h-4 w-4' />
                            Sign In Again
                        </Button>
                        <Button
                            variant='outline'
                            className='w-full'
                            onClick={() => router.push('/')}
                        >
                            <Home className='mr-2 h-4 w-4' />
                            Go to Homepage
                        </Button>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
}
