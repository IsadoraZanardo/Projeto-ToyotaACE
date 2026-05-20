"use client";

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AppHeader from "@/components/AppHeader";
import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const AppLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground bg-black">
        Carregando...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-black">
        <AppSidebar />

        <div className="flex-1 flex flex-col min-w-0 min-h-screen">
          <AppHeader />

          <div className="flex items-center px-4 py-2 border-b bg-card md:hidden">
            <SidebarTrigger />
          </div>

          <main className="flex-1 p-4 md:p-6 animate-fade-in">
            <Outlet />
          </main>

          <footer className="border-t border-zinc-800 bg-black">
            <div className="h-20 flex items-center justify-center text-sm text-gray-400">
              © {new Date().getFullYear()} Toyota do Brasil — Todos os direitos
              reservados
            </div>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;