import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, getProduct } from "@/data/products";
import { ProductDetail } from "@/components/product-detail";
export function generateStaticParams(){return products.map(product=>({slug:product.slug}));}
export function generateMetadata({params}:{params:{slug:string}}):Metadata{const p=getProduct(params.slug);return p?{title:p.name,description:p.description,openGraph:{title:`${p.name} | Aurelia & Co.`,description:p.description,images:[p.images[0]]}}:{title:"Piece not found"};}
export default function ProductPage({params}:{params:{slug:string}}){const product=getProduct(params.slug);if(!product)notFound();return <ProductDetail product={product} related={products.filter(p=>p.category===product.category&&p.id!==product.id).slice(0,3)}/>;}
