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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '@/lib/schemas';
import { toast } from 'sonner';
import { useLogin } from '@/api/use-login';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

function LoginCard() {
    const router = useRouter();
    const { mutate: login, isPending } = useLogin();

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

    const onSubmit = (data: LoginFormData) => {
        toast.promise(
            new Promise(async (resolve, reject) => {
                await signIn('credentials', {
                    email: data.email,
                    password: data.password,
                })
                    .then((result) => {
                        if (result?.error) {
                            reject(new Error(result.error));
                        } else {
                            resolve(true);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            }),
            {
                loading: 'Logging in...',
                success: 'Logged in successfully!',
                error: (error) => error.message || 'Failed to login',
            }
        );
    };

    return (
        <Card className='mx-auto w-full max-w-lg p-6'>
            <CardHeader className='space-y-2'>
                <CardTitle className='text-3xl font-bold'>Login</CardTitle>
                <CardDescription className='text-base'>
                    Welcome back! Please enter your credentials to continue.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                    <div className='space-y-2'>
                        <Label htmlFor='email' className='text-base'>
                            Email
                        </Label>
                        <Input
                            id='email'
                            type='email'
                            {...register('email')}
                            disabled={isPending}
                            className={`h-11 text-base ${
                                errors.email ? 'border-red-500' : ''
                            }`}
                            placeholder='john@example.com'
                        />
                        {errors.email && (
                            <p className='text-sm text-red-500'>
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='password' className='text-base'>
                            Password
                        </Label>
                        <Input
                            id='password'
                            type='password'
                            {...register('password')}
                            disabled={isPending}
                            className={`h-11 text-base ${
                                errors.password ? 'border-red-500' : ''
                            }`}
                            placeholder='••••••••'
                        />
                        {errors.password && (
                            <p className='text-sm text-red-500'>
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    <Button
                        type='submit'
                        className='w-full h-11 text-base'
                        disabled={isPending}
                    >
                        {isPending ? 'Logging in...' : 'Login'}
                    </Button>
                </form>
            </CardContent>
            <CardFooter className='flex justify-center border-t pt-6 mt-6'>
                <p className='text-base text-muted-foreground'>
                    Don't have an account?{' '}
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
