import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/services/api-client';
import { queryClient } from '@/lib/react-query';

export const useDeleteContent = () => {
    return useMutation({
        mutationFn: async (id: string) => {
            await apiClient.delete(`/content/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['content'] });
        },
    });
};
