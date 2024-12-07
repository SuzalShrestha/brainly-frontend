import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/services/api-client';
import { queryClient } from '@/lib/react-query';
import { toast } from 'sonner';

export const useDeleteContent = () => {
    return useMutation({
        mutationFn: async (id: string) => {
            await apiClient.delete(`/content/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['content'] });
            toast.success('Content deleted successfully');
        },
        onError: (error) => {
            toast.error(error.message || 'Failed to delete content');
        },
    });
};
