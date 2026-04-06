import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, CreditCard, Car } from "lucide-react";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold">Perfil do Cliente</h1>

      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="text-lg">Dados Pessoais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <User className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Nome</p>
              <p className="font-medium">{user?.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CreditCard className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">CPF</p>
              <p className="font-medium">{user?.cpf}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <CardHeader>
          <CardTitle className="text-lg">Veículo Vinculado</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <Car className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Corolla Cross XRE 2025</p>
              <p className="text-sm text-muted-foreground">Branco Pérola • 2.0 Flex</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
