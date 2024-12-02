import { apiClient } from '@/services/api-client';
import { useQuery } from '@tanstack/react-query';

interface BrainContent {
    _id: string;
    title: string;
    content: string;
    link?: string;
    tags: string[];
    type: 'link' | 'video' | 'document' | 'tweet';
    createdAt: string;
}

const getBrainContent = async (id: string): Promise<BrainContent[]> => {
    const res = await apiClient.get(`/brain/${id}`);
    return res.data;
};

export const useGetBrainContent = (id: string) => {
    return useQuery({
        queryKey: ['brain', id],
        queryFn: () => getBrainContent(id),
        enabled: !!id, // Only fetch when id is available
    });
};
