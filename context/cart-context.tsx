"use client";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { CartLine } from "@/types";
type CartContextValue = { lines: CartLine[]; count: number; hydrated: boolean; addItem: (id:string, quantity?:number)=>void; updateQuantity:(id:string,quantity:number)=>void; removeItem:(id:string)=>void; clearCart:()=>void; drawerOpen:boolean; setDrawerOpen:(open:boolean)=>void };
const CartContext = createContext<CartContextValue | null>(null);
export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  useEffect(() => { try { const stored = localStorage.getItem("aurelia-cart"); if (stored) setLines(JSON.parse(stored) as CartLine[]); } catch { localStorage.removeItem("aurelia-cart"); } setHydrated(true); }, []);
  useEffect(() => { if (hydrated) localStorage.setItem("aurelia-cart", JSON.stringify(lines)); }, [lines, hydrated]);
  const value = useMemo<CartContextValue>(() => ({
    lines, count:lines.reduce((n,line)=>n+line.quantity,0), hydrated,
    addItem:(id,quantity=1)=>setLines(current=>{const found=current.find(line=>line.productId===id);return found?current.map(line=>line.productId===id?{...line,quantity:line.quantity+quantity}:line):[...current,{productId:id,quantity}]}),
    updateQuantity:(id,quantity)=>setLines(current=>quantity<=0?current.filter(line=>line.productId!==id):current.map(line=>line.productId===id?{...line,quantity:Math.min(quantity,99)}:line)),
    removeItem:(id)=>setLines(current=>current.filter(line=>line.productId!==id)), clearCart:()=>setLines([]), drawerOpen, setDrawerOpen
  }), [lines, hydrated, drawerOpen]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export function useCart() { const context=useContext(CartContext); if(!context) throw new Error("useCart must be used inside CartProvider"); return context; }
