'use client';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <main className='flex flex-col gap-2 w-full m-10'>
                    <div className='flex justify-between'>
                        <SidebarTrigger />
                        <Button onClick={() => signOut()} variant={'ghost'}>
                            Logout
                        </Button>
                    </div>
                    {children}
                </main>
            </SidebarProvider>
        </>
    );
}
