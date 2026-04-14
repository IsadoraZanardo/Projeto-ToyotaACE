import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import logoT from "@/assets/logoT.png";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth(); // pode usar depois pra auto login
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Preencha todos os campos.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    // simulação de cadastro
    const newUser = { name, email };
    localStorage.setItem("user", JSON.stringify(newUser));

    // auto login
    login(email, password);

    navigate("/");
  };

  return (
    <div className="w-full min-h-screen bg-[url('https://mir-s3-cdn-cf.behance.net/project_modules/fs/c84ab249239255.56085275bc31a.png')] bg-center bg-cover flex flex-col items-center justify-center p-4">
      
      <Card className="w-full max-w-md animate-fade-in backdrop-blur-xl bg-white/10">
        
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 flex items-center justify-center mb-1">
            <img src={logoT} alt="Toyota Logo" className="w-24 h-24 object-contain" />
          </div>

          <CardTitle className="text-2xl font-bold text-white">
            Criar Conta
          </CardTitle>

          <CardDescription className="text-white">
            Cadastre-se para acompanhar seu veículo
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* NOME */}
            <div className="space-y-2">
              <Label className="text-white">Nome</Label>
              <Input
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* EMAIL */}
            <div className="space-y-2">
              <Label className="text-white">Email</Label>
              <Input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* SENHA */}
            <div className="space-y-2">
              <Label className="text-white">Senha</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* CONFIRMAR SENHA */}
            <div className="space-y-2">
              <Label className="text-white">Confirmar Senha</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {/* ERRO */}
            {error && (
              <p className="text-sm text-red-500 text-center">
                {error}
              </p>
            )}

            {/* BOTÃO */}
            <Button type="submit" className="w-full">
              Criar conta
            </Button>

            {/* LOGIN */}
            <p className="text-center text-white text-sm">
              Já tem conta?{" "}
              <Link to="/login" className="hover:underline font-medium">
                Entrar
              </Link>
            </p>

          </form>
        </CardContent>
      </Card>

       
    </div>
  );
};

export default RegisterPage;