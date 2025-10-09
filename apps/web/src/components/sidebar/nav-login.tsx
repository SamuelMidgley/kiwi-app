import { CircleUser } from "lucide-react";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { LoginDialogContent } from "./login-dialog-content";

export const NavLogin = () => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Dialog>
          <DialogTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <CircleUser />
              Log in
            </SidebarMenuButton>
          </DialogTrigger>

          <LoginDialogContent />
        </Dialog>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
