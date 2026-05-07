import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/ThemeToggle";
import { toast } from "sonner";
import loginBg from "@/assets/login-bg.jpg";

const Cadastro = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Preencha todos os campos");
      return;
    }

    toast.success("Conta criada com sucesso!");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      <img
        src={loginBg}
        className="absolute inset-0 w-full h-full object-cover blur-sm scale-105 brightness-[0.3]"
      />

      <div className="relative z-10 w-full max-w-sm mx-4 animate-reveal-up">
        <div className="bg-card border border-border rounded-lg p-8 shadow-2xl shadow-black/40">
          
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center p-1">
              <img src="/toyota_logo.png" className="w-full h-full object-contain" />
            </div>

            <div>
              <h1 className="text-lg font-semibold">Cadastro</h1>
              <p className="text-xs text-muted-foreground">
                Criar nova conta
              </p>
            </div>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            
            <div className="space-y-2">
              <Label>Nome</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>E-mail</Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>Senha</Label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <Button className="w-full">Cadastrar</Button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-4">
            Já tem conta?{" "}
            <span
              onClick={() => navigate("/")}
              className="text-primary cursor-pointer hover:underline"
            >
              Fazer login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;