import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function AvatarLogin({ src, name }: { src?: string; name: string }) {
    return (
        <Avatar>
            <AvatarImage src={src} alt='@user' />
            <AvatarFallback>{name?.charAt(0)?.toUpperCase()}</AvatarFallback>
        </Avatar>
    );
}
