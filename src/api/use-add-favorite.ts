import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { apiClient } from '@/services/api-client';
import { queryClient } from '@/lib/react-query';

const postAddFavorite = async (_id: string) => {
    const response = await apiClient.post(`/favorite/${_id}`);
    return response.data;
};

export const usePostAddFavorite = (): UseMutationResult<
    string,
    Error,
    string
> => {
    return useMutation({
        mutationFn: postAddFavorite,
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ['content'] });
        },
    });
};
