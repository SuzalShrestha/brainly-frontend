import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { apiClient } from '@/services/api-client';
import { queryClient } from '@/lib/react-query';

const deleteContent = async (id: string) => {
    const response = await apiClient.delete(`/content/${id}`);
    return response.data;
};

export const useDeleteContent = (): UseMutationResult<any, Error, string> => {
    return useMutation({
        mutationFn: deleteContent,
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ['content'] });
        },
    });
};
