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
import { useLogin } from '@/api/use-login';

function LoginCard() {
    const { mutate: login, isPending: isLoading } = useLogin();
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
        try {
            toast.promise(
                new Promise((resolve, reject) => {
                    login(data, {
                        onSuccess: () => {
                            resolve(true);
                        },
                        onError: (error) => {
                            reject(error);
                        },
                    });
                }),
                {
                    loading: 'Logging in...',
                    success: 'Logged in successfully',
                    error: 'Invalid email or password',
                }
            );
        } catch {
            toast.error('Something went wrong. Please try again.');
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
                            <Input
                                {...register('password')}
                                placeholder='********'
                                disabled={isLoading}
                            />
                        </div>
                        {errors.password && (
                            <p className='text-red-500'>
                                {errors.password.message as string}
                            </p>
                        )}
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
