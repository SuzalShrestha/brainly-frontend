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
import { FileText, Link, Twitter, Youtube } from 'lucide-react';
const items = [
    {
        title: 'Tweets',
        url: '#',
        icon: Twitter,
    },
    {
        title: 'Videos',
        url: '#',
        icon: Youtube,
    },
    {
        title: 'Documents',
        url: '#',
        icon: FileText,
    },
    {
        title: 'Links',
        url: '#',
        icon: Link,
    },
];
export function AppSidebar() {
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
                                    <a href={item.url}>
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </a>
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
