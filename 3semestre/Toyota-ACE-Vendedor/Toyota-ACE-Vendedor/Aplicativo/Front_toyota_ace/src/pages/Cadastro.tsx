import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/ThemeToggle";
import { toast } from "sonner";
import logoT from "@/assets/logoT.png";

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const navigate = useNavigate();
  const { register } = useAppContext();

  const handleCadastro = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome || !email || !senha || !confirmarSenha) {
      toast.error("Preencha todos os campos");
      return;
    }

    if (senha !== confirmarSenha) {
      toast.error("As senhas não são iguais");
      return;
    }

    const success = register(nome, email, senha);

    if (success) {
      toast.success("Cadastro realizado com sucesso!");
      navigate("/");
    } else {
      toast.error("Não foi possível realizar o cadastro");
    }
  };

  return (
    <div className="w-full min-h-screen bg-[url('https://mir-s3-cdn-cf.behance.net/project_modules/fs/c84ab249239255.56085275bc31a.png')] bg-center bg-cover flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md animate-fade-in backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl shadow-2xl shadow-black/40 p-8">
        <div className="text-center space-y-2 mb-6">
          <div className="mx-auto w-16 h-16 flex items-center justify-center mb-1">
            <img
              src={logoT}
              alt="Toyota Logo"
              className="w-24 h-24 object-contain"
            />
          </div>

          <h1 className="text-2xl font-bold text-white">Criar Conta</h1>

          <p className="text-sm text-white/90">
            Cadastre-se no ACE Vendedor
          </p>
        </div>

        <form onSubmit={handleCadastro} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome" className="text-white">
              Nome completo
            </Label>

            <Input
              id="nome"
              type="text"
              placeholder="Seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="bg-black/80"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              E-mail
            </Label>

            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-black/80"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="senha" className="text-white">
              Senha
            </Label>

            <Input
              id="senha"
              type="password"
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="bg-black/80"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmarSenha" className="text-white">
              Confirmar senha
            </Label>

            <Input
              id="confirmarSenha"
              type="password"
              placeholder="••••••••"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              className="bg-black/80"
            />
          </div>

          <Button type="submit" className="w-full">
            Cadastrar
          </Button>

          <p className="text-center text-white text-sm">
            Já tem conta?{" "}
            <Link
              to="/"
              className="text-primary hover:underline font-medium"
            >
              Entrar
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;