import { SidebarProvider, SidebarHeader, SidebarContent, SidebarGroup, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, Sidebar, SidebarFooter } from "@/components/ui/sidebar";
import { Calendar, GlassWater, LogOut } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function Layout({ children }: { children: React.ReactNode; }) {
    const supabase = createClient();
    const { data: { user } } = await (await supabase).auth.getUser();

    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader>
                    <h1 className="text-2xl font-bold">Ox4Me</h1>
                    <h2 className="font-bold mt-2">Bienvenue { user?.user_metadata.name }</h2>
                    <p className="text-sm text-muted-foreground">Gère tes cocktails préférés et préviens tes potes de tes dispos à l&apos;Ox !</p>
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
                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <form
                                action="/api/auth/signout"
                                method="POST"
                            >
                                <SidebarMenuButton
                                    type="submit"
                                    className="cursor-pointer"
                                >
                                    <LogOut size={ 20 } />
                                    Logout
                                </SidebarMenuButton>
                            </form>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>
            <SidebarTrigger className="m-2" />
            <div className="w-full py-6 pe-6">
                { children }
            </div>
        </SidebarProvider >
    );
};