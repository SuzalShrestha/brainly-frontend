'use client';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { geistSans } from '@/lib/fonts';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { CommandDialogSearch } from '@/components/command-search';
import { useIsMobile } from '@/hooks/use-mobile';
import { LogoutIcon } from '@/components/ui/logout';
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const isMobile = useIsMobile();
    return (
        <div className={`${geistSans.variable} min-h-screen bg-background`}>
            <SidebarProvider>
                <AppSidebar />
                <main className='flex flex-col gap-2 w-full m-10'>
                    <div className='flex justify-between'>
                        <SidebarTrigger />
                        {!isMobile && <CommandDialogSearch />}
                        <div className='flex gap-2'>
                            <ThemeToggle />
                            <Button onClick={() => signOut()} variant={'ghost'}>
                                <LogoutIcon />
                                Logout
                            </Button>
                        </div>
                    </div>
                    {children}
                </main>
            </SidebarProvider>
        </div>
    );
}
