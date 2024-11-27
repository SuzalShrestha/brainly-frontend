import { apiClient } from '@/services/api-client';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

const getShareContent = async () => {
    const response = await apiClient.post('/brain/share', {
        share: true,
    });
    return response.data;
};

export const useShareContent = <T>(): UseQueryResult<T, Error> => {
    return useQuery({
        queryKey: ['share-content'],
        queryFn: () => getShareContent(),
    });
};
