import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/cart-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";
const cormorant = Cormorant_Garamond({ subsets:["latin"], variable:"--font-cormorant", weight:["300","400","500","600"], display:"swap" });
const inter = Inter({ subsets:["latin"], variable:"--font-inter", display:"swap" });
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: { default:"Aurelia & Co. — Fine Jewelry, Made to Be Kept", template:"%s | Aurelia & Co." },
  description:"Discover fine jewelry by Aurelia & Co. Timeless rings, necklaces, earrings and bracelets, crafted to be treasured.",
  openGraph:{ title:"Aurelia & Co. — Timeless pieces, crafted to be treasured.", description:"A considered collection of fine jewelry and modern heirlooms.", type:"website", images:["/og-cover.jpg"] }
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${cormorant.variable} ${inter.variable}`}><CartProvider><Header/><main>{children}</main><Footer/><CartDrawer/></CartProvider></body></html>;
}
