import { apiClient } from '@/services/api-client';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

interface ShareResponse {
    shareUrl: string;
    hash: string;
}

const shareContent = async (): Promise<ShareResponse> => {
    const response = await apiClient.post('/brain/share', {
        share: true,
    });
    return response.data;
};

export const useShareContent = (): UseMutationResult<
    ShareResponse,
    Error,
    void
> => {
    return useMutation({
        mutationFn: shareContent,
    });
};
