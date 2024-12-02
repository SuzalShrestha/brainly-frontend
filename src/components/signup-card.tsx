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
import { signupSchema, type SignupFormData } from '@/lib/schemas';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSignup } from '@/api/use-signup';

export function SignupCard() {
    const router = useRouter();
    const { mutate: signup, isPending } = useSignup();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            userName: '',
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = (data: SignupFormData) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { confirmPassword, ...signupData } = data;

        toast.promise(
            new Promise((resolve, reject) => {
                signup(signupData, {
                    onSuccess: () => {
                        router.push('/login');
                        resolve(true);
                    },
                    onError: (error) => {
                        reject(error);
                    },
                });
            }),
            {
                loading: 'Creating your account...',
                success: 'Account created successfully!',
                error: (error) => error.message || 'Failed to create account',
            }
        );
    };

    return (
        <Card className='mx-auto w-full max-w-lg p-6'>
            <CardHeader className='space-y-2'>
                <CardTitle className='text-3xl font-bold'>Sign up</CardTitle>
                <CardDescription className='text-base'>
                    Create an account to get started with Brainly
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                    <div className='space-y-2'>
                        <Label htmlFor='name' className='text-base'>
                            Full Name
                        </Label>
                        <Input
                            {...register('name')}
                            disabled={isPending}
                            className={`h-11 text-base ${
                                errors.name ? 'border-red-500' : ''
                            }`}
                            placeholder='John Doe'
                        />
                        {errors.name && (
                            <p className='text-sm text-red-500'>
                                {errors.name.message}
                            </p>
                        )}
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='userName' className='text-base'>
                            Username
                        </Label>
                        <Input
                            {...register('userName')}
                            disabled={isPending}
                            className={`h-11 text-base ${
                                errors.userName ? 'border-red-500' : ''
                            }`}
                            placeholder='johndoe'
                        />
                        {errors.userName && (
                            <p className='text-sm text-red-500'>
                                {errors.userName.message}
                            </p>
                        )}
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='email' className='text-base'>
                            Email Address
                        </Label>
                        <Input
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
                    <div className='space-y-2'>
                        <Label htmlFor='confirmPassword' className='text-base'>
                            Confirm Password
                        </Label>
                        <Input
                            type='password'
                            {...register('confirmPassword')}
                            disabled={isPending}
                            className={`h-11 text-base ${
                                errors.confirmPassword ? 'border-red-500' : ''
                            }`}
                            placeholder='••••••••'
                        />
                        {errors.confirmPassword && (
                            <p className='text-sm text-red-500'>
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>
                    <Button
                        type='submit'
                        className='w-full h-11 text-base'
                        disabled={isPending}
                    >
                        {isPending ? 'Creating account...' : 'Create Account'}
                    </Button>
                </form>
            </CardContent>
            <CardFooter className='flex justify-center border-t pt-6 mt-6'>
                <p className='text-base text-muted-foreground'>
                    Already have an account?{' '}
                    <Link
                        href='/login'
                        className='text-primary font-medium hover:underline'
                    >
                        Sign in
                    </Link>
                </p>
            </CardFooter>
        </Card>
    );
}
