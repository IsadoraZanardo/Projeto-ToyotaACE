import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/ThemeToggle";
import { toast } from "sonner";
import loginBg from "@/assets/login-bg.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAppContext();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Preencha todos os campos");
      return;
    }

    const success = login(email, password);

    if (success) {
      toast.success("Login realizado com sucesso!");
      navigate("/filial");
    } else {
      toast.error("E-mail ou senha inválidos");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      
      {/* Theme */}
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      {/* Background */}
      <img
        src={loginBg}
        className="absolute inset-0 w-full h-full object-cover blur-sm scale-105 brightness-[0.3]"
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-sm mx-4 animate-reveal-up">
        <div className="bg-card border border-border rounded-lg p-8 shadow-2xl shadow-black/40">
          
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center p-1">
              <img src="/toyota_logo.png" className="w-full h-full object-contain" />
            </div>

            <div>
              <h1 className="text-lg font-semibold">ACE Vendedor</h1>
              <p className="text-xs text-muted-foreground">
                Toyota Sales System
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            
            <div className="space-y-2">
              <Label>E-mail</Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Senha</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button className="w-full">Entrar</Button>
          </form>

          {/* Links */}
          <p className="text-xs text-muted-foreground text-center mt-4">
            Esqueceu a senha?{" "}
            <span
              onClick={() => navigate("/recuperar")}
              className="text-primary cursor-pointer hover:underline"
            >
              Clique aqui
            </span>
          </p>

          <p className="text-xs text-muted-foreground text-center mt-2">
            Não tem conta?{" "}
            <span
              onClick={() => navigate("/cadastro")}
              className="text-primary cursor-pointer hover:underline"
            >
              Criar conta
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;