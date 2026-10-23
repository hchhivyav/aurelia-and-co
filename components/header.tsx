"use client";
import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/context/cart-context";
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count, setDrawerOpen } = useCart();
  useEffect(() => { const update = () => setScrolled(window.scrollY > 28); update(); window.addEventListener("scroll", update, { passive:true }); return () => window.removeEventListener("scroll", update); }, []);
  return <header className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${scrolled ? "bg-ivory/95 text-ink backdrop-blur-md shadow-[0_1px_0_rgba(184,155,94,.25)]" : "bg-transparent text-white"}`}>
    <div className="mx-auto grid h-[82px] max-w-[1600px] grid-cols-3 items-center px-5 md:px-10">
      <nav className="hidden items-center gap-7 lg:flex">
        {[["Collections","/#collections"],["Rings","/collections/rings"],["Necklaces","/collections/necklaces"],["About","/about"]].map(([label,href]) => <Link key={label} href={href} className="gold-link eyebrow whitespace-nowrap">{label}</Link>)}
      </nav>
      <button aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)} className="justify-self-start lg:hidden"><Menu size={20}/></button>
      <Link href="/" className="justify-self-center text-center leading-none">
        <span className="font-editorial block text-[27px] tracking-[.07em] md:text-[32px]">Aurelia <span className="text-champagne">&</span> Co.</span>
        <span className="mt-2 hidden text-[8px] uppercase tracking-[.25em] opacity-75 sm:block">Fine jewelry house</span>
      </Link>
      <div className="flex items-center justify-self-end gap-3 md:gap-5"><span className="hidden border-l border-champagne/60 pl-4 text-[9px] uppercase tracking-[.18em] sm:inline">Cambodia · USD</span><button onClick={() => setDrawerOpen(true)} className="relative p-2" aria-label={`Open shopping bag, ${count} items`}>
        <ShoppingBag size={19} strokeWidth={1.4}/><span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-champagne px-1 text-[9px] text-ink">{count}</span>
      </button></div>
    </div>
    {open && <div className="absolute inset-x-0 top-full border-t border-champagne/30 bg-ivory px-6 py-7 text-ink lg:hidden"><button onClick={() => setOpen(false)} aria-label="Close menu" className="absolute right-5 top-5"><X size={18}/></button><div className="flex flex-col gap-6 pt-4">{[["Collections","/#collections"],["Rings","/collections/rings"],["Necklaces","/collections/necklaces"],["About","/about"]].map(([label,href]) => <Link key={label} href={href} onClick={() => setOpen(false)} className="eyebrow">{label}</Link>)}</div></div>}
  </header>;
}
