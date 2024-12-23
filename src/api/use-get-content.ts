import { apiClient } from '@/services/api-client';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

const getContent = async <T>(): Promise<T> => {
    const res = await apiClient.get('/content');
    return res.data.data;
};

export const useGetContent = <T>(): UseQueryResult<T, Error> => {
    return useQuery({
        queryKey: ['content'],
        queryFn: () => getContent<T>(),
    });
};
