import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Outlet } from "react-router-dom";

import ChatbotScreen from "@/pages/ChatbotScreen";

export function AppLayout() {
  return (
    <SidebarProvider>

      <div className="min-h-screen flex w-full overflow-hidden bg-background text-foreground">

        {/* Sidebar */}
        <AppSidebar />

        {/* Conteúdo */}
        <div className="flex-1 flex flex-col min-w-0">

          {/* Header */}
          <header className="h-14 flex items-center border-b border-border px-4 shrink-0 bg-background">

            <SidebarTrigger />

            <span className="ml-3 text-sm text-muted-foreground">
              Toyota ACE Vendedor
            </span>

            <div className="ml-auto">
              <ThemeToggle />
            </div>

          </header>

          {/* Main */}
          <main className="flex-1 overflow-auto p-4 md:p-6 animate-fade-in">
            <Outlet />
          </main>

        </div>

        {/* CHATBOT GLOBAL */}
        <ChatbotScreen />

      </div>

    </SidebarProvider>
  );
}