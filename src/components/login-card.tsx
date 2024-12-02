'use client';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
import Link from 'next/link';

function LoginCard() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const handleLogin = async () => {
        try {
            setIsLoading(true);
            toast.loading('Logging in...');
            const result = await signIn('credentials', {
                email,
                password,
            });
            if (result?.error) {
                toast.dismiss();
                toast.error('Invalid email or password');
                return;
            }
            toast.dismiss();
            toast.success('Logged in successfully');
        } catch {
            toast.dismiss();
            toast.error('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className='mx-auto max-w-sm p-3'>
            <CardHeader className='space-y-1'>
                <CardTitle className='text-2xl font-bold'>Login</CardTitle>
                <CardDescription>
                    Enter your email and password to login to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className='space-y-4'>
                    <div className='space-y-2'>
                        <Label htmlFor='email'>Email</Label>
                        <Input
                            id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type='email'
                            placeholder='johndoe@example.com'
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='password'>Password</Label>
                        <Input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            id='password'
                            type='password'
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <Button
                        onClick={() => handleLogin()}
                        className='w-full'
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </Button>
                </div>
            </CardContent>
            <CardFooter className='flex justify-center border-t pt-6 mt-6'>
                <p className='text-base text-muted-foreground'>
                    Don&apos;t have an account?{' '}
                    <Link
                        href='/signup'
                        className='text-primary font-medium hover:underline'
                    >
                        Sign up
                    </Link>
                </p>
            </CardFooter>
        </Card>
    );
}

export default LoginCard;
