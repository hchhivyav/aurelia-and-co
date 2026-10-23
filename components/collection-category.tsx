"use client";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/motion";
import type { Product } from "@/types";
export function CollectionCategory({title,products}:{title:string;products:Product[]}){return <section className="mx-auto min-h-[70vh] max-w-[1600px] px-6 pb-24 pt-36 md:px-12 md:pt-44"><Reveal><p className="eyebrow text-champagne">The collection</p><h1 className="font-editorial mt-4 text-6xl font-light md:text-8xl">{title}</h1><p className="mt-5 text-sm text-muted">Considered forms, made to become part of your story.</p></Reveal><div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">{products.map((p,i)=><Reveal key={p.id} delay={i*.06}><ProductCard product={p}/></Reveal>)}</div></section>}
