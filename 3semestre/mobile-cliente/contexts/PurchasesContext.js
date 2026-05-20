import { createContext, useContext, useState } from "react";

const PurchasesContext = createContext({
  purchases: [],
  addPurchase: () => {},
});

export function PurchasesProvider({ children }) {
  const [purchases, setPurchases] = useState([]);

  function addPurchase(cart, paymentMethod, totalValue) {
    const newPurchase = {
      id: Date.now(),
      date: new Date().toLocaleDateString("pt-BR"),
      items: cart,
      paymentMethod,
      total: totalValue,
    };

    setPurchases((prev) => [newPurchase, ...prev]);
  }

  return (
    <PurchasesContext.Provider value={{ purchases, addPurchase }}>
      {children}
    </PurchasesContext.Provider>
  );
}

export function usePurchases() {
  return useContext(PurchasesContext);
}