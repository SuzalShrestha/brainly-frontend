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
import { toast } from 'sonner';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormData } from '@/lib/schemas';
import { loginSchema } from '@/lib/schemas';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
function LoginCard() {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const searchParams = useSearchParams();
    const [isError] = useState(searchParams.get('error'));
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const handleLogin = async (data: LoginFormData) => {
        setIsLoading(true);
        try {
            await signIn('credentials', data);
        } catch {
            toast.error('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };
    const clearParams = () => {
        router.push('/login');
    };
    useEffect(() => {
        if (isError) {
            clearParams();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError]);
    return (
        <Card className='mx-auto max-w-sm p-3'>
            <CardHeader className='space-y-1'>
                <CardTitle className='text-2xl font-bold'>Login</CardTitle>
                <CardDescription>
                    Enter your email and password to login to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className='space-y-4'>
                        <div className='space-y-2'>
                            <Label htmlFor='email'>Email</Label>
                            <Input
                                {...register('email')}
                                placeholder='johndoe@example.com'
                                disabled={isLoading}
                            />
                        </div>
                        {errors.email && (
                            <p className='text-red-500'>
                                {errors.email.message as string}
                            </p>
                        )}
                        <div className='space-y-2'>
                            <Label htmlFor='password'>Password</Label>
                            <div className='flex items-center relative'>
                                <div className='w-full'>
                                    <Input
                                        {...register('password')}
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        placeholder='********'
                                        disabled={isLoading}
                                    />
                                </div>
                                {showPassword ? (
                                    <EyeIcon
                                        className='absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer pr-2'
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    />
                                ) : (
                                    <EyeOffIcon
                                        className='absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer pr-2'
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    />
                                )}
                            </div>
                        </div>
                        {isError && (
                            <p className='text-red-500'>
                                Invalid email or password
                            </p>
                        )}
                        <Button
                            type='button'
                            variant='outline'
                            className='w-full'
                            disabled={isLoading}
                            onClick={() => signIn('google')}
                        >
                            <Image
                                src='/logo/google.svg'
                                alt='Google'
                                height={20}
                                width={20}
                            />
                            Login with Google
                        </Button>
                        <Button
                            type='submit'
                            className='w-full'
                            disabled={isLoading}
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </Button>
                    </div>
                </form>
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
