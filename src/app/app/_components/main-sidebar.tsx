'use client'

import {
  DashboardSidebar,
  DashboardSidebarHeader,
  DashboardSidebarMain,
  DashboardSidebarNav,
  DashboardSidebarNavMain,
  DashboardSidebarNavLink,
  DashboardSidebarNavHeader,
  DashboardSidebarNavHeaderTitle,
  DashboardSidebarFooter,
} from "@/components/dashboard/sidebar";
import { HomeIcon, MixerVerticalIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter } from "next/navigation";
import { UserDropdown } from "./user-dropdown";
import { Session } from "next-auth";
import { Logo } from "@/components/dashboard/logo";

type MainSidebarProps = {
  user: Session['user']
}
export function MainSidebar({ user }: MainSidebarProps) {

  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <DashboardSidebar>
      <DashboardSidebarHeader>
      <Logo/>
      </DashboardSidebarHeader>

      <DashboardSidebarMain className="flex flex-col flex-grow">
        <DashboardSidebarNav>
          <DashboardSidebarNavMain>

            <DashboardSidebarNavLink 
            href="/app"
             active={isActive('/app')}
             >
             <HomeIcon className="w-3 h-3 mr-3"/>
              Tarefas
             </DashboardSidebarNavLink>
            
            <DashboardSidebarNavLink
             href="/app/settings"
             active={isActive('/app/settings')}
             >
              <MixerVerticalIcon className="w-3 h-3 mr-3"/>
              Configurações
             </DashboardSidebarNavLink>
          </DashboardSidebarNavMain>
        </DashboardSidebarNav>

        <DashboardSidebarNav className="mt-auto">
          <DashboardSidebarNavHeader>
            <DashboardSidebarNavHeaderTitle>link extras</DashboardSidebarNavHeaderTitle>
          </DashboardSidebarNavHeader>
          <DashboardSidebarNavMain>
            <DashboardSidebarNavLink href="/">Ajuda</DashboardSidebarNavLink>
            <DashboardSidebarNavLink href="/app/settings">Site</DashboardSidebarNavLink>
          </DashboardSidebarNavMain>
        </DashboardSidebarNav>
      </DashboardSidebarMain>
      <DashboardSidebarFooter>
        <UserDropdown user={user}/>
      </DashboardSidebarFooter>
    </DashboardSidebar>
  );
}
