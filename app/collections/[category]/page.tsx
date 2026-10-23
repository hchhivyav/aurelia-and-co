import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { CollectionCategory } from "@/components/collection-category";
const categories=["rings","necklaces","earrings","bracelets"] as const;
export function generateStaticParams(){return categories.map(category=>({category}));}
export function generateMetadata({params}:{params:{category:string}}):Metadata{return {title:`${params.category[0]?.toUpperCase()}${params.category.slice(1)} | The Collection`,description:`Explore fine ${params.category} by Aurelia & Co.`};}
export default function CategoryPage({params}:{params:{category:string}}){const category=params.category.toLowerCase();if(!categories.includes(category as typeof categories[number]))notFound();const items=products.filter(p=>p.category.toLowerCase()===category);return <CollectionCategory title={category[0].toUpperCase()+category.slice(1)} products={items}/>;}
