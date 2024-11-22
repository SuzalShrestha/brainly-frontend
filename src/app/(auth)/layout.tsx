export const metadata = {
    title: 'Brainly',
    description: 'Your Second Brain',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <main className=' w-full m-10'>{children}</main>;
}
