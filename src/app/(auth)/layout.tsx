import { geistSans } from '@/lib/fonts';

export const metadata = {
    title: 'Brainly',
    description: 'Your Second Brain',
};

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div
            className={`${geistSans.variable}
            max-w-screen-sm mx-auto h-screen flex items-center justify-center
            bg-background`}
        >
            {children}
        </div>
    );
}
