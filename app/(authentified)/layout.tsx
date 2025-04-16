import { SidebarProvider, SidebarHeader, SidebarContent, SidebarGroup, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, Sidebar } from "@/components/ui/sidebar";
import { Calendar, GlassWater } from "lucide-react";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode; }) {
    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader>
                    <h1 className="text-2xl font-bold">Ox4Me</h1>
                    <p className="text-sm text-muted-foreground">Gère tes cocktails et tes dispos à l&apos;Ox !</p>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/calendrier" className="flex items-center gap-2">
                                        <Calendar size={ 20 } />
                                        Calendrier
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/cocktails" className="flex items-center gap-2">
                                        <GlassWater size={ 20 } />
                                        Cocktails
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
            <SidebarTrigger className="m-2" />
            <div className="w-full py-6 pe-6">
                { children }
            </div>
        </SidebarProvider>
    );
};