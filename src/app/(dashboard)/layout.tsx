'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <AppSidebar />
            <main className=' flex flex-col gap-10 w-full m-10'>
                <SidebarTrigger />
                {children}
            </main>
        </>
    );
}
