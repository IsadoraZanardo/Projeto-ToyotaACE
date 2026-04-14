import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import logoT from "@/assets/logoT.png";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setMessage("Digite seu email.");
      return;
    }

    // Simulação de envio
    setMessage("Se o email existir, enviaremos instruções para recuperação.");
  };

  return (
    <div className="w-full min-h-screen bg-[url('https://mir-s3-cdn-cf.behance.net/project_modules/fs/c84ab249239255.56085275bc31a.png')] bg-center bg-cover flex flex-col items-center justify-center p-4">
      
      <Card className="w-full max-w-md animate-fade-in backdrop-blur-xl bg-white/10">
        
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 flex items-center justify-center mb-1">
            <img src={logoT} alt="Toyota Logo" className="w-24 h-24 object-contain" />
          </div>

          <CardTitle className="text-2xl font-bold text-white">
            Recuperar Senha
          </CardTitle>

          <CardDescription className="text-white">
            Informe seu email para receber instruções de recuperação
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* EMAIL */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>

              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* MENSAGEM */}
            {message && (
              <p className="text-sm text-white text-center">
                {message}
              </p>
            )}

            {/* BOTÃO */}
            <Button type="submit" className="w-full">
              Enviar instruções
            </Button>

            {/* VOLTAR LOGIN */}
            <p className="text-center text-sm text-white">
              Lembrou a senha?{" "}
              <Link to="/login" className="hover:underline font-medium">
                Voltar ao login
              </Link>
            </p>

          </form>
        </CardContent>
      </Card>

      
    </div>
    
  );
};

export default ForgotPasswordPage;