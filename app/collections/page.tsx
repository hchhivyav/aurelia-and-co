"use client";
import { useMemo, useState } from "react";
import { products } from "@/data/products";
import type { Category } from "@/types";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/motion";
const categories = ["All pieces","Rings","Necklaces","Earrings","Bracelets"] as const;
export default function CollectionsPage() {
 const [category,setCategory]=useState<typeof categories[number]>("All pieces");
 const [sort,setSort]=useState("featured");
 const shown=useMemo(()=>products.filter(p=>category==="All pieces"||p.category===category).sort((a,b)=>sort==="low"?a.price-b.price:sort==="high"?b.price-a.price:0),[category,sort]);
 return <section className="mx-auto min-h-[70vh] max-w-[1600px] px-6 pb-24 pt-36 md:px-12 md:pt-44"><Reveal><p className="eyebrow text-champagne">Aurelia & Co.</p><h1 className="font-editorial mt-4 text-6xl font-light md:text-8xl">The collection</h1><p className="mt-5 max-w-lg text-sm leading-7 text-muted">A collection of enduring forms, chosen for their quiet character and considered craft.</p></Reveal><div className="mt-12 flex flex-col justify-between gap-5 border-y border-champagne/50 py-5 md:flex-row md:items-center"><div className="flex flex-wrap gap-x-6 gap-y-3">{categories.map(c=><button key={c} onClick={()=>setCategory(c)} className={`eyebrow transition-colors ${category===c?"text-ink":"text-muted hover:text-ink"}`} aria-pressed={category===c}>{c}{category===c&&<span className="ml-2 text-champagne">—</span>}</button>)}</div><label className="flex items-center gap-3"><span className="eyebrow text-muted">Sort</span><select value={sort} onChange={e=>setSort(e.target.value)} className="w-auto border-0 py-1 text-xs"><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></label></div><p className="eyebrow mt-7 text-muted">{shown.length} pieces</p><div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6 md:gap-y-14">{shown.map((p,i)=><Reveal key={p.id} delay={(i%4)*.05}><ProductCard product={p}/></Reveal>)}</div></section>;
}
