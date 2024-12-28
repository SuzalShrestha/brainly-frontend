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
import { useRouter } from 'next/navigation';
import { YoutubeIcon } from './ui/youtube';
import { FilePenLineIcon } from './ui/file-pen-line';
import { LinkIcon } from './ui/link';
import { MessageCircleMoreIcon } from './ui/message-circle-more';
const items = [
    {
        title: 'Tweets',
        url: 'tweet',
        icon: MessageCircleMoreIcon,
    },
    {
        title: 'Videos',
        url: 'video',
        icon: YoutubeIcon,
    },
    {
        title: 'Documents',
        url: 'document',
        icon: FilePenLineIcon,
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
