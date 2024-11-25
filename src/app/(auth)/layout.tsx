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
        <div className={`${geistSans.variable} min-h-screen bg-background`}>
            {children}
        </div>
    );
}
