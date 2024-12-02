import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

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

export const metadata: Metadata = {
    title: 'Brainly',
    description: 'Your Second Brain',
};
import { Toaster } from 'sonner';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from '@/providers/theme-provider';
import { ReactQueryProvider } from '@/providers/react-query-provider';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <head>
                {/* react-scan */}
                {/* <script
                    src='https://unpkg.com/react-scan/dist/auto.global.js'
                    async
                /> */}
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
            >
                <ThemeProvider>
                    <ReactQueryProvider>
                        <Toaster position={'bottom-right'} />
                        <ReactQueryDevtools initialIsOpen={false} />
                        {children}
                    </ReactQueryProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
