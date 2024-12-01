import {
    Sidebar,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { FileText, Link as LinkIcon, Twitter, Youtube } from 'lucide-react';
import { useRouter } from 'next/navigation';
const items = [
    {
        title: 'Tweets',
        url: 'tweet',
        icon: Twitter,
    },
    {
        title: 'Videos',
        url: 'video',
        icon: Youtube,
    },
    {
        title: 'Documents',
        url: 'document',
        icon: FileText,
    },
    {
        title: 'Links',
        url: 'link',
        icon: LinkIcon,
    },
];
export function AppSidebar() {
    const { push } = useRouter();
    return (
        <Sidebar>
            <SidebarHeader />
            <div className='text-4xl font-bold p-5 text-center'>Brainly</div>
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <div
                                        onClick={() => {
                                            push(`/dashboard?type=${item.url}`);
                                        }}
                                    >
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </div>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
            <SidebarFooter />
        </Sidebar>
    );
}
