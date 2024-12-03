import type { LoginFormData } from '@/lib/schemas';
import { signIn, SignInResponse } from 'next-auth/react';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

export const useLogin = (): UseMutationResult<
    SignInResponse,
    Error,
    LoginFormData
> => {
    return useMutation({
        mutationFn: async (data: LoginFormData) => {
            const result = await signIn('credentials', data);
            if (result) return result;
            throw new Error('Invalid email or password');
        },
    });
};
