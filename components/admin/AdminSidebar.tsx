"use client";

import {
  LayoutDashboard,
  MessageSquare,
  Briefcase,
  HelpCircle,
  Users,
  FileText,
  LogOut,
  FolderTree,
  Settings,
  Shield,
  Package,
  Building2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const menuGroups = [
  {
    label: "Utama",
    items: [
      { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
      { title: "Konsultasi Masuk", url: "/admin/inquiries", icon: MessageSquare },
    ],
  },
  {
    label: "Konten Website",
    items: [
      { title: "Layanan", url: "/admin/services", icon: Briefcase },
      { title: "Garansi Layanan", url: "/admin/guarantees", icon: Shield },
      { title: "Paket Harga", url: "/admin/pricing", icon: Package },
      { title: "Sektor Industri", url: "/admin/industry-sectors", icon: Building2 },
      { title: "FAQ", url: "/admin/faqs", icon: HelpCircle },
      { title: "Testimoni", url: "/admin/testimonials", icon: Users },
    ],
  },
  {
    label: "Blog & Konten",
    items: [
      { title: "Artikel / Insights", url: "/admin/posts", icon: FileText },
      { title: "Kategori", url: "/admin/categories", icon: FolderTree },
    ],
  },
  {
    label: "Sistem",
    items: [
      { title: "Pengaturan", url: "/admin/settings", icon: Settings },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/auth");
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center gap-2 font-bold text-xl text-primary">
          <Briefcase className="w-6 h-6" />
          <span>Satya Admin</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {menuGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.url}
                      tooltip={item.title}
                    >
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="p-4 border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} className="text-destructive">
              <LogOut />
              <span>Keluar</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
