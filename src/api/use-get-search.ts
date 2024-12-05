import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/services/api-client';

export interface SearchResult {
    _id: string;
    title: string;
    content: string;
    link?: string;
    tags: string[];
    type: 'link' | 'video' | 'document' | 'tweet';
    createdAt: string;
}

interface SearchResponse {
    data: SearchResult[];
    total: number;
}

const searchContent = async (query: string): Promise<SearchResponse> => {
    if (!query) return { data: [], total: 0 };
    const response = await apiClient.get<SearchResponse>(
        `/content/search?q=${encodeURIComponent(query)}`
    );
    console.log(response.data);
    return response.data;
};

export const useGetSearch = (query: string) => {
    return useQuery({
        queryKey: ['search', query],
        queryFn: () => searchContent(query),
        enabled: query.length > 0,
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
        gcTime: 1000 * 60 * 30, // Remove from cache after 30 minutes
        refetchOnWindowFocus: false,
    });
};
