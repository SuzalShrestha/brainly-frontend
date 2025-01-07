'use client';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AvatarLogin } from '@/components/avatar';
import { User, Settings, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
// import { useRouter } from 'next/navigation';

interface ProfileMenuProps {
    image?: string | null;
    name?: string | null;
    email?: string | null;
}

export function ProfileMenu({ image, name, email }: ProfileMenuProps) {
    // const router = useRouter();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='flex items-center gap-2 outline-none'>
                <div className='flex items-center gap-2 hover:bg-muted p-2 rounded-md transition-colors'>
                    {name && (
                        <>
                            <AvatarLogin src={image || undefined} name={name} />
                            <span className='text-sm font-medium hidden md:inline-block'>
                                {name}
                            </span>
                        </>
                    )}
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-56'>
                <div className='flex flex-col space-y-1 p-2'>
                    <p className='text-sm font-medium'>{name}</p>
                    <p className='text-xs text-muted-foreground'>{email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className='cursor-pointer'
                    // onClick={() => router.push('/profile')}
                >
                    <User className='mr-2 h-4 w-4' />
                    Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                    className='cursor-pointer'

                    // onClick={() => router.push('/settings')}
                >
                    <Settings className='mr-2 h-4 w-4' />
                    Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className='cursor-pointer text-destructive focus:text-destructive'
                    onClick={() => signOut({ redirectTo: '/logout-success' })}
                >
                    <LogOut className='mr-2 h-4 w-4' />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
