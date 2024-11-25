import { queryClient } from '@/lib/react-query';
import { apiClient } from '@/services/api-client';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { toast } from 'sonner';

const postContent = async <T>(content: T): Promise<T> => {
    const res = await apiClient.post('/content', content);
    return res.data;
};

export const usePostContent = <T>(): UseMutationResult<T, Error, T> => {
    return useMutation({
        mutationFn: (content: T) => postContent<T>(content),
        onSuccess: () => {
            queryClient.invalidateQueries('content');
            toast.success('Content posted successfully');
        },
    });
};
