import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { apiClient } from '@/services/api-client';
import { ContentFormData } from '@/lib/schemas';
import { queryClient } from '@/lib/react-query';

const postContent = async (data: ContentFormData) => {
    const response = await apiClient.post('/content', data);
    return response.data;
};

export const usePostContent = (): UseMutationResult<
    string,
    Error,
    ContentFormData
> => {
    return useMutation({
        mutationFn: postContent,
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ['content'] });
        },
    });
};
