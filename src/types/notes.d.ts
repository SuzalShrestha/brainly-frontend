export interface NotesProps {
    filter?: 'all' | 'favorites' | 'shared';
}

export interface NoteType {
    _id: string;
    title: string;
    content: string;
    link?: string;
    tags: string[];
    type: 'link' | 'video' | 'document' | 'tweet';
    createdAt: string;
    isFavorite?: boolean;
    isShared?: boolean;
    updatedAt: string;
}
