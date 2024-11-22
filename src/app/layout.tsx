'use client';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

import { QueryClient } from 'react-query';
export const queryClient = new QueryClient();

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
});

// export const metadata: Metadata = {
//     title: 'Brainly',
//     description: 'Your Second Brain',
// };
import { Toaster } from 'sonner';
import { QueryClientProvider } from 'react-query';
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <QueryClientProvider client={queryClient}>
                    <Toaster position={'top-left'} />
                    {children}
                </QueryClientProvider>
            </body>
        </html>
    );
}
