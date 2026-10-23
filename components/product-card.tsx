"use client";
import Image from "next/image";
import Link from "next/link";
import { Check, Plus } from "lucide-react";
import { useState } from "react";
import { formatPrice } from "@/data/products";
import type { Product } from "@/types";
import { useCart } from "@/context/cart-context";
export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  function add() { addItem(product.id, 1); setAdded(true); window.setTimeout(() => setAdded(false), 1400); }
  return <article className="product-card group min-w-0">
    <Link href={`/products/${product.slug}`} className="block" aria-label={`View ${product.name}`}>
      <div className="relative aspect-[4/5] overflow-hidden bg-[#e9e3d9]">
        <Image src={product.images[0]} alt={product.name} fill sizes="(max-width: 640px) 50vw, (max-width: 1200px) 33vw, 25vw" className="product-image object-cover" />
        <Image src={product.images[1] || product.images[0]} alt="" aria-hidden fill sizes="(max-width: 640px) 50vw, (max-width: 1200px) 33vw, 25vw" className="product-alt absolute inset-0 object-cover" />
        <span className="absolute inset-x-4 bottom-0 h-px bg-champagne scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
      </div>
    </Link>
    <div className="flex items-start justify-between gap-3 pt-4">
      <div><p className="eyebrow text-muted mb-2">{product.category}</p><Link href={`/products/${product.slug}`} className="font-editorial text-[22px] leading-tight hover:text-[#8e7545] transition-colors">{product.name}</Link></div>
      <span className="font-editorial text-lg whitespace-nowrap pt-5">{formatPrice(product.price)}</span>
    </div>
    <button onClick={add} disabled={product.stock < 1} className="quick-add mt-3 inline-flex items-center gap-2 border-b border-champagne pb-1 text-[9px] uppercase tracking-luxury disabled:opacity-40">
      {added ? <><Check size={13}/> Added to bag</> : <><Plus size={13}/> Quick add</>}
    </button>
  </article>;
}
