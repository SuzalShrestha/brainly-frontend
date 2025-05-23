import { useMutation } from '@tanstack/react-query';
import {
    SignupFormData,
    // signupResponseSchema,
    // type SignupResponse,
} from '@/lib/schemas';
import { apiClient } from '@/services/api-client';

export const useSignup = () => {
    return useMutation<
        // SignupResponse,
        unknown,
        Error,
        Omit<SignupFormData, 'confirmPassword'>,
        unknown
    >({
        mutationFn: async (data) => {
            const response = await apiClient.post<unknown>(
                '/auth/signup',
                data
            );
            return response.data;
        },
    });
};
