import { TrendingUp, Car, Users, Target, ChevronLeft, ChevronRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { salesData, vehicles } from "@/lib/mock-data";
import { useAppContext } from "@/contexts/AppContext";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState, useRef, useEffect } from "react";

const FeaturedCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  };

  useEffect(() => { checkScroll(); }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -220 : 220, behavior: "smooth" });
    setTimeout(checkScroll, 300);
  };

  return (
    <div className="rounded-lg border border-border bg-card p-4 animate-reveal-up delay-2">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-medium">Destaques da loja</h2>
        <div className="flex gap-1">
          <button onClick={() => scroll("left")} disabled={!canScrollLeft} className="w-7 h-7 rounded-md bg-secondary flex items-center justify-center hover:bg-primary/15 transition-colors disabled:opacity-30">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button onClick={() => scroll("right")} disabled={!canScrollRight} className="w-7 h-7 rounded-md bg-secondary flex items-center justify-center hover:bg-primary/15 transition-colors disabled:opacity-30">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div ref={scrollRef} onScroll={checkScroll} className="flex gap-3 overflow-x-auto scrollbar-hide pb-1" style={{ scrollbarWidth: "none" }}>
        {vehicles.map((v) => (
          <div key={v.id} className="shrink-0 w-44 rounded-lg border border-border overflow-hidden hover:border-primary/30 transition-all group cursor-pointer">
            <div className="h-24 overflow-hidden">
              <img src={v.image} alt={v.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-2">
              <p className="text-xs font-medium truncate">{v.name}</p>
              <p className="text-xs text-primary font-bold tabular-nums">{v.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { userName, selectedBranch, clients, appointments } = useAppContext();
  const today = format(new Date(), "d 'de' MMMM, yyyy", { locale: ptBR });

  const closedCount = clients.filter((c) => c.status === "fechado").length;
  const conversionRate = clients.length > 0 ? Math.round((closedCount / clients.length) * 100) : 0;
  const todayAppointments = appointments.filter((a) => a.date === "2026-03-21").length;

  const metrics = [
    { label: "Vendas do mês", value: String(closedCount), icon: TrendingUp, change: `${todayAppointments} agendamentos hoje` },
    { label: "Veículos disponíveis", value: String(vehicles.length), icon: Car, change: "no catálogo" },
    { label: "Clientes ativos", value: String(clients.length), icon: Users, change: `${clients.filter((c) => c.status === "lead").length} leads` },
    { label: "Taxa de conversão", value: `${conversionRate}%`, icon: Target, change: `${closedCount} fechados de ${clients.length}` },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold animate-reveal-up">
          Bom dia, {userName || "Vendedor"}
        </h1>
        <p className="text-sm text-muted-foreground animate-reveal-up delay-1">
          {selectedBranch || "Toyota"} · {today}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <div key={m.label} className={`p-4 rounded-lg border border-border bg-card hover:border-primary/30 transition-colors animate-reveal-up delay-${i + 1}`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-muted-foreground">{m.label}</span>
              <m.icon className="h-4 w-4 text-primary" />
            </div>
            <p className="text-2xl font-bold tabular-nums">{m.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{m.change}</p>
          </div>
        ))}
      </div>

      <FeaturedCarousel />

      <div className="rounded-lg border border-border bg-card p-4 animate-reveal-up delay-3">
        <h2 className="text-sm font-medium mb-4">Desempenho de vendas</h2>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesData}>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "hsl(0 0% 60%)", fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(0 0% 60%)", fontSize: 12 }} />
              <Tooltip contentStyle={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(0 0% 16%)", borderRadius: 8, color: "#fff", fontSize: 12 }} />
              <Bar dataKey="vendas" fill="hsl(355 100% 45.1%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
