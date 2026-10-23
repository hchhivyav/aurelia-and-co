import type { CartLine, Product } from "@/types";
export const SHIPPING_THRESHOLD = 500;
export const SHIPPING_FEE = 35;
export const TAX_RATE = 0.08;
export function cartTotals(lines: CartLine[], catalog: Product[]) {
  const subtotal = lines.reduce((sum, line) => sum + (catalog.find(p => p.id === line.productId)?.price ?? 0) * line.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  return { subtotal, shipping, tax, total: subtotal + shipping + tax };
}
