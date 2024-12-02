import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/services/api-client';
import { ContentFormData } from '@/lib/schemas';

interface UpdateContentPayload extends ContentFormData {
    _id: string;
}

export const useUpdateContent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ _id, ...data }: UpdateContentPayload) => {
            const response = await apiClient.put(`/content/${_id}`, data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['content'] });
        },
    });
};
