import React from "react";
import { Home, Car, DollarSign, CalendarDays, User } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import toyotaicon from "@/assets/toyotaicon.png";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Veículo", url: "/veiculo", icon: Car },
  { title: "Financiamento", url: "/financiamento", icon: DollarSign },
  { title: "Agendamento", url: "/agendamento", icon: CalendarDays },
  { title: "Perfil", url: "/perfil", icon: User },
];

const AppSidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar className="border-r"> 
      <div className="flex items-center justify-center h-14 border-b">
        <img
          src={toyotaicon}
          alt="Toyota Logo"
          className={collapsed ? "w-8 h-8 object-contain" : "w-10 h-10 object-contain"}
        />
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const active = location.pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end
                        className={`transition-colors ${
                          active
                            ? "bg-accent text-accent-foreground font-medium"
                            : "hover:bg-muted"
                        }`}
                        activeClassName="bg-accent text-accent-foreground font-medium"
                      >
                        <item.icon className="h-4 w-4 mr-2 shrink-0" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;