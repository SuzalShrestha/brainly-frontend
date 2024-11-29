import { useMutation } from '@tanstack/react-query';
import { LoginFormData } from '@/lib/schemas';
import { signIn } from 'next-auth/react';

export const useLogin = () => {
    return useMutation({
        mutationFn: async (data: LoginFormData) => {
            const result = await signIn('credentials', {
                email: data.email,
                password: data.password,
            });

            if (result?.error) {
                throw new Error(result.error);
            }

            return result;
        },
    });
};
