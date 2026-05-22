"use client";

import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/contexts/AuthContext";

import AppHeader from "@/components/AppHeader";
import AppSidebar from "@/components/AppSidebar";

import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import ChatbotScreen from "@/pages/ChatbotScreen";

const AppLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-muted-foreground">
        Carregando...
      </div>
    );
  }

  // Proteção das rotas
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <SidebarProvider>

      <div className="min-h-screen flex w-full overflow-hidden bg-background text-foreground">

        {/* Sidebar */}
        <AppSidebar />

        {/* Área principal */}
        <div className="flex flex-1 flex-col min-w-0 min-h-screen">

          {/* Header */}
          <AppHeader />

          {/* Mobile Sidebar Button */}
          <div className="flex items-center px-4 py-2 border-b bg-card md:hidden">
            <SidebarTrigger />
          </div>

          {/* Conteúdo */}
          <main className="flex-1 overflow-auto p-4 md:p-6 animate-fade-in">
            <Outlet />
          </main>

          {/* Footer */}
          <footer className="border-t border-border bg-background">
            <div className="h-20 flex items-center justify-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} Toyota do Brasil — Todos os direitos reservados
            </div>
          </footer>

        </div>

        {/* CHATBOT GLOBAL */}
        <ChatbotScreen />

      </div>

    </SidebarProvider>
  );
};

export default AppLayout;