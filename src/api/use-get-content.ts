import { apiClient } from '@/services/api-client';
import { useQuery } from 'react-query';

const getContent = async () => {
    const res = await apiClient.get('/content');
    return res.data;
};

export const useGetContent = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: 'content',
        queryFn: getContent,
    });
    return { data, error, isLoading };
};
