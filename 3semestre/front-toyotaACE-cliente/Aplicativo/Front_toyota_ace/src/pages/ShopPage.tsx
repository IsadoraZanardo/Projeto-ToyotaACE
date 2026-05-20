import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/services/api";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Tag,
  Star,
  Trash2,
  Plus,
  Minus,
  CheckCircle2,
} from "lucide-react";

import { toast } from "sonner";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice: number;
  image: string;
};

type CartItem = Product & {
  quantity: number;
};

const toyotaLogo =
  "https://www.toyota.com.br/media/brand/toyota-logo-2020.png";

const promotions = [
  {
    id: 1,
    title: "Kit Revisão Toyota",
    description: "Até 20% OFF em kits selecionados de manutenção.",
    price: "A partir de R$ 189,90",
    image: toyotaLogo,
  },
  {
    id: 2,
    title: "Acessórios Originais",
    description: "Tapetes, protetores e itens exclusivos Toyota.",
    price: "Promoções especiais",
    image: toyotaLogo,
  },
  {
    id: 3,
    title: "Linha Lifestyle",
    description: "Bonés, camisetas, garrafas e produtos oficiais.",
    price: "Até 15% OFF",
    image: toyotaLogo,
  },
];

const products: Product[] = [
  {
    id: 1,
    name: "Tapete Original Toyota",
    category: "Acessórios",
    price: 249.9,
    oldPrice: 299.9,
    image: toyotaLogo,
  },
  {
    id: 2,
    name: "Kit Limpeza Automotiva",
    category: "Cuidados",
    price: 89.9,
    oldPrice: 119.9,
    image: toyotaLogo,
  },
  {
    id: 3,
    name: "Boné Toyota Gazoo Racing",
    category: "Lifestyle",
    price: 129.9,
    oldPrice: 159.9,
    image: toyotaLogo,
  },
  {
    id: 4,
    name: "Protetor de Porta",
    category: "Acessórios",
    price: 79.9,
    oldPrice: 99.9,
    image: toyotaLogo,
  },
];

const formatPrice = (value: number) => {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

const ShopPage = () => {
  const { user } = useAuth();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);

  const promotion = promotions[currentSlide];

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const discount = subtotal >= 300 ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === promotions.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? promotions.length - 1 : prev - 1
    );
  };

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const itemExists = prev.find((item) => item.id === product.id);

      if (itemExists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });

    toast.success(`${product.name} adicionado ao carrinho!`);
  };

  const decreaseQuantity = (id: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const increaseQuantity = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    toast.success("Produto removido do carrinho.");
  };

  const finishPurchase = async () => {
    if (!user?.id) {
      toast.error("Faça login para finalizar a compra.");
      return;
    }

    if (cart.length === 0) {
      toast.error("Seu carrinho está vazio.");
      return;
    }

    if (!paymentMethod) {
      toast.error("Selecione uma forma de pagamento.");
      return;
    }

    try {
      setLoading(true);

      for (const item of cart) {
        await api.criarCompra({
          clienteId: user.id,
          produto: item.name,
          quantidade: item.quantity,
          preco: item.price,
          total: item.price * item.quantity,
          metodoPagamento: paymentMethod,
        });
      }

      setCartOpen(false);
      setSuccessOpen(true);

      toast.success("Compra registrada com sucesso!");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erro ao registrar compra."
      );
    } finally {
      setLoading(false);
    }
  };

  const resetPurchase = () => {
    setCart([]);
    setPaymentMethod("");
    setSuccessOpen(false);
  };

  const paymentLabel = (method: string) => {
    const labels: Record<string, string> = {
      pix: "Pix",
      credito: "Cartão de crédito",
      debito: "Cartão de débito",
      boleto: "Boleto",
    };

    return labels[method] || method;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6 space-y-8">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Toyota Shop
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Produtos, acessórios e promoções exclusivas Toyota.
            </p>
          </div>

          <Button variant="outline" onClick={() => setCartOpen(true)}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            Carrinho
            {totalItems > 0 && (
              <span className="ml-2 rounded-full bg-red-600 px-2 py-0.5 text-xs text-white">
                {totalItems}
              </span>
            )}
          </Button>
        </div>

        <section className="relative overflow-hidden rounded-2xl bg-black border border-red-600 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center p-6 md:p-10">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                <Tag className="h-3.5 w-3.5" />
                Promoção Especial
              </span>

              <h2 className="text-3xl md:text-4xl font-bold text-white">
                {promotion.title}
              </h2>

              <p className="text-gray-300">{promotion.description}</p>

              <p className="text-xl font-bold text-red-500">
                {promotion.price}
              </p>
            </div>

            <div className="flex justify-center">
              <img
                src={promotion.image}
                alt={promotion.title}
                className="max-h-48 object-contain bg-white rounded-xl p-6"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {promotions.map((item, index) => (
              <button
                type="button"
                key={item.id}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === index ? "w-8 bg-red-600" : "w-2 bg-white/40"
                }`}
              />
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Produtos em destaque
            </h2>
            <p className="text-sm text-muted-foreground">
              Escolha produtos originais e acessórios Toyota.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden hover:border-red-500/50 transition-all"
              >
                <div className="bg-gray-100 dark:bg-zinc-800 h-40 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-24 object-contain"
                  />
                </div>

                <CardContent className="p-4 space-y-3">
                  <div>
                    <span className="text-xs text-red-600 font-semibold">
                      {product.category}
                    </span>

                    <h3 className="font-semibold text-gray-900 dark:text-white leading-tight">
                      {product.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {formatPrice(product.price)}
                    </p>

                    <p className="text-sm text-muted-foreground line-through">
                      {formatPrice(product.oldPrice)}
                    </p>
                  </div>

                  <Button
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => addToCart(product)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Adicionar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <Dialog open={cartOpen} onOpenChange={setCartOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Carrinho de compras</DialogTitle>
            <DialogDescription>
              Finalize sua compra de produtos Toyota.
            </DialogDescription>
          </DialogHeader>

          {cart.length === 0 ? (
            <div className="py-10 text-center text-muted-foreground">
              Seu carrinho está vazio.
            </div>
          ) : (
            <div className="space-y-4">
              <div className="max-h-72 overflow-y-auto space-y-3 pr-1">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 rounded-lg border bg-card p-3"
                  >
                    <div className="h-16 w-16 rounded-md bg-gray-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="max-h-10 object-contain"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm text-gray-900 dark:text-white">
                        {item.name}
                      </h3>

                      <p className="text-xs text-muted-foreground">
                        {item.category}
                      </p>

                      <p className="font-semibold text-sm">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>

                      <span className="w-6 text-center font-medium">
                        {item.quantity}
                      </span>

                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => increaseQuantity(item.id)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="rounded-lg bg-muted p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between text-sm text-green-600">
                  <span>Desconto</span>
                  <span>- {formatPrice(discount)}</span>
                </div>

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Forma de pagamento</p>

                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma forma de pagamento" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="pix">Pix</SelectItem>
                    <SelectItem value="credito">Cartão de crédito</SelectItem>
                    <SelectItem value="debito">Cartão de débito</SelectItem>
                    <SelectItem value="boleto">Boleto</SelectItem>
                  </SelectContent>
                </Select>

                {paymentMethod && (
                  <p className="text-xs text-muted-foreground">
                    Pagamento selecionado: {paymentLabel(paymentMethod)}
                  </p>
                )}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setCartOpen(false)}>
              Continuar comprando
            </Button>

            <Button
              onClick={finishPurchase}
              disabled={loading || cart.length === 0}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {loading ? "Finalizando..." : "Finalizar compra"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-9 w-9 text-green-600" />
            </div>

            <DialogTitle className="text-center">
              Compra registrada!
            </DialogTitle>

            <DialogDescription className="text-center">
              Sua compra foi salva no sistema e poderá ser consultada no seu
              perfil.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              onClick={resetPurchase}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShopPage;