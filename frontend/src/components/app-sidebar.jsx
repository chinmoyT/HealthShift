import * as React from "react"
import { GalleryVerticalEnd } from "lucide-react"
import localStorageUtil from "../utils/localStorage";
import navbarItems from "../configs/navigationConfig";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom";

export function AppSidebar({isCollapsed, ...props}) {
  const [allowedModules, setAllowedModules] = React.useState([]);

  React.useEffect(() => {
    const access = localStorageUtil.getDecryptedItem("access");

    const filterAllowedModules = navbarItems?.filter(
      (item) => access[item.Module]?.canView
    );

    setAllowedModules(filterAllowedModules);
  }, []);
  return (
    (<Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                {!isCollapsed && (
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-medium">HealthShift</span>
                    {/* <span className="">v1.0.0</span> */}
                  </div>
                )}
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {allowedModules?.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link
                    to={item.url}
                    className="flex items-center gap-3 justify-center md:justify-start"
                  >
                    <item.icon size={20} />
                    {!isCollapsed && <span>{item.title}</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>)
  );
}
