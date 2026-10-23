"use client";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Minus, Plus, X } from "lucide-react";
import { products, formatPrice } from "@/data/products";
import { cartTotals } from "@/lib/utils";
import { useCart } from "@/context/cart-context";
export function CartDrawer() {
  const { lines, drawerOpen, setDrawerOpen, updateQuantity, removeItem } = useCart();
  const items=lines.map(line=>({line,product:products.find(p=>p.id===line.productId)})).filter((item):item is {line:typeof lines[number];product:typeof products[number]}=>Boolean(item.product));
  const totals=cartTotals(lines,products);
  return <AnimatePresence>
    {drawerOpen && <><motion.button aria-label="Close shopping bag" className="fixed inset-0 z-50 cursor-default bg-black/35 backdrop-blur-[2px]" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setDrawerOpen(false)}/><motion.aside role="dialog" aria-modal="true" aria-label="Shopping bag" className="fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-[470px] flex-col bg-ivory text-ink shadow-2xl" initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}} transition={{duration:.65,ease:[.22,1,.36,1]}}>
      <div className="flex items-center justify-between border-b border-champagne/50 px-6 py-6"><div><p className="eyebrow text-muted">Your selection</p><h2 className="font-editorial mt-1 text-3xl">Shopping bag <span className="text-base">({lines.reduce((n,l)=>n+l.quantity,0)})</span></h2></div><button onClick={()=>setDrawerOpen(false)} aria-label="Close bag"><X size={20}/></button></div>
      <div className="flex-1 overflow-y-auto px-6">{items.length===0?<div className="flex h-full flex-col items-center justify-center text-center"><p className="font-editorial text-3xl">A little room for something beautiful.</p><p className="mt-3 text-sm text-muted">Your bag is currently empty.</p><button onClick={()=>setDrawerOpen(false)} className="outline-button mt-7">Discover the collection</button></div>:items.map(({line,product})=><div key={product.id} className="flex gap-4 border-b border-black/10 py-5"><Link href={`/products/${product.slug}`} onClick={()=>setDrawerOpen(false)} className="relative aspect-[4/5] w-[92px] shrink-0 bg-[#e8e2d9]"><Image src={product.images[0]} alt={product.name} fill sizes="92px" className="object-cover"/></Link><div className="flex flex-1 flex-col"><Link href={`/products/${product.slug}`} onClick={()=>setDrawerOpen(false)} className="font-editorial text-xl">{product.name}</Link><span className="mt-1 text-sm">{formatPrice(product.price)}</span><div className="mt-auto flex items-center justify-between pt-4"><div className="flex items-center gap-4 border border-black/15 px-2 py-1"><button onClick={()=>updateQuantity(product.id,line.quantity-1)} aria-label="Decrease quantity"><Minus size={12}/></button><span className="text-xs">{line.quantity}</span><button onClick={()=>updateQuantity(product.id,line.quantity+1)} aria-label="Increase quantity"><Plus size={12}/></button></div><button onClick={()=>removeItem(product.id)} className="text-[9px] uppercase tracking-widest text-muted underline underline-offset-4">Remove</button></div></div></div>)}</div>
      {items.length>0&&<div className="border-t border-champagne/50 px-6 py-6"><div className="flex justify-between text-sm"><span>Subtotal</span><span className="font-editorial text-xl">{formatPrice(totals.subtotal)}</span></div><p className="mt-2 text-xs text-muted">Shipping and taxes calculated at checkout.</p><Link href="/cart" onClick={()=>setDrawerOpen(false)} className="mt-5 flex w-full items-center justify-between bg-ink px-5 py-4 text-ivory transition-colors hover:bg-[#332d24]"><span className="eyebrow">View bag & checkout</span><ArrowRight size={16}/></Link></div>}
    </motion.aside></>}
  </AnimatePresence>;
}
