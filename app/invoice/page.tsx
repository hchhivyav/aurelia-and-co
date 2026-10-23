"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Download, Printer } from "lucide-react";
import type { Order } from "@/types";
import { formatPrice } from "@/data/products";

function escapeHtml(value: unknown) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[char] ?? char);
}

function downloadInvoiceHtml(order: Order) {
  const rows = order.items.map(({ product, quantity }) => `
    <tr><td><strong>${escapeHtml(product.name)}</strong><small>${escapeHtml(product.material)}</small></td><td>${quantity}</td><td>${escapeHtml(formatPrice(product.price))}</td><td class="right">${escapeHtml(formatPrice(product.price * quantity))}</td></tr>`).join("");
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Aurelia &amp; Co. Invoice ${escapeHtml(order.number)}</title>
<style>
:root{color-scheme:light;--ink:#171512;--paper:#fffdf9;--gold:#b89b5e;--muted:#777168}*{box-sizing:border-box}body{margin:0;background:#f7f3ec;color:var(--ink);font:14px/1.7 Arial,Helvetica,sans-serif}.sheet{max-width:900px;margin:40px auto;padding:56px;background:var(--paper);border:1px solid #dfd1b5}.brand{font:42px/1.1 Georgia,'Times New Roman',serif;letter-spacing:.04em}.gold{color:var(--gold)}.eyebrow{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted)}.top,.columns{display:flex;justify-content:space-between;gap:32px}.top{align-items:flex-end}.rule{border:0;border-top:1px solid var(--gold);margin:32px 0}.columns>div{flex:1}h1{font:48px/1.1 Georgia,'Times New Roman',serif;font-weight:400;margin:18px 0 0}table{width:100%;border-collapse:collapse;margin-top:28px}th{text-align:left;font-size:10px;letter-spacing:.13em;text-transform:uppercase;color:var(--muted);font-weight:400;border-bottom:1px solid var(--gold)}td,th{padding:15px 8px;border-bottom:1px solid #e8e2d8}td:first-child,th:first-child{padding-left:0}small{display:block;color:var(--muted);margin-top:3px}.right{text-align:right}.totals{width:280px;max-width:100%;margin:28px 0 0 auto}.total-row{display:flex;justify-content:space-between;padding:6px 0}.grand{border-top:1px solid var(--gold);margin-top:10px;padding-top:16px;font:28px Georgia,'Times New Roman',serif}.thanks{text-align:center;border-top:1px solid #dfd1b5;margin-top:48px;padding-top:24px;color:var(--muted);font-size:12px}.actions{text-align:center;margin:20px}.print{background:var(--ink);color:white;border:1px solid var(--gold);padding:12px 22px;letter-spacing:.15em;text-transform:uppercase;font-size:10px;cursor:pointer}@media(max-width:640px){.sheet{margin:0;padding:24px}.top,.columns{flex-direction:column}h1{font-size:40px}.brand{font-size:34px}table{font-size:12px}td,th{padding:10px 4px}}@media print{body{background:white}.sheet{max-width:none;margin:0;padding:10mm;border:0}.actions{display:none}}
</style></head><body><main class="sheet"><div class="top"><div><div class="eyebrow gold">Aurelia &amp; Co. · Fine jewelry house</div><h1>Invoice</h1></div><div><div class="eyebrow">Invoice number</div><strong>${escapeHtml(order.number)}</strong><div>${escapeHtml(new Date(order.date).toLocaleDateString())}</div></div></div><hr class="rule"><div class="columns"><div><div class="eyebrow">Billed to</div><p>${escapeHtml(order.customer.name)}<br>${escapeHtml(order.customer.address)}<br>${escapeHtml(order.customer.city)}, ${escapeHtml(order.customer.postalCode)}<br>${escapeHtml(order.customer.country)}<br>${escapeHtml(order.customer.email)}${order.customer.phone ? `<br>${escapeHtml(order.customer.phone)}` : ""}</p></div><div><div class="eyebrow">Payment method</div><p>${order.customer.paymentMethod === "card" ? "Credit / debit card (demo)" : "Cash on delivery"}</p><div class="eyebrow">Currency</div><p>USD</p></div></div><table><thead><tr><th>Piece</th><th>Qty</th><th>Unit price</th><th class="right">Amount</th></tr></thead><tbody>${rows}</tbody></table><div class="totals"><div class="total-row"><span>Subtotal</span><span>${escapeHtml(formatPrice(order.subtotal))}</span></div><div class="total-row"><span>Shipping</span><span>${order.shipping ? escapeHtml(formatPrice(order.shipping)) : "Complimentary"}</span></div><div class="total-row"><span>Tax</span><span>${escapeHtml(formatPrice(order.tax))}</span></div><div class="total-row grand"><span>Total</span><span>${escapeHtml(formatPrice(order.total))}</span></div></div><div class="thanks">Thank you for choosing Aurelia &amp; Co.<br>Certified authentic · Crafted to be treasured.</div></main><div class="actions"><button class="print" onclick="window.print()">Print invoice</button></div></body></html>`;
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `aurelia-invoice-${String(order.number).replace(/[^a-z0-9-_]/gi, "-")}.html`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export default function InvoicePage() {
  const [order, setOrder] = useState<Order | null>(null);
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("aurelia-last-order");
      if (raw) setOrder(JSON.parse(raw) as Order);
    } catch {
      setOrder(null);
    }
  }, []);

  if (!order) return <section className="mx-auto min-h-[70vh] max-w-3xl px-6 pb-24 pt-44 text-center"><p className="eyebrow text-champagne">Aurelia &amp; Co.</p><h1 className="font-editorial mt-5 text-5xl">Your invoice awaits.</h1><p className="mt-4 text-sm text-muted">Complete a demo checkout to generate an invoice for your order.</p><Link href="/collections" className="outline-button mt-8">Discover the collection</Link></section>;

  return <section className="invoice-page mx-auto max-w-4xl px-6 pb-24 pt-36 md:pt-44"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="eyebrow text-champagne">Aurelia &amp; Co. · Fine jewelry house</p><h1 className="font-editorial mt-4 text-6xl font-light">Invoice</h1></div><div className="flex flex-wrap gap-3 print:hidden"><button onClick={() => downloadInvoiceHtml(order)} className="outline-button gap-2" aria-label="Download standalone HTML invoice"><Download size={14}/> Download invoice (.html)</button><button onClick={() => window.print()} className="outline-button gap-2" aria-label="Print invoice"><Printer size={14}/> Print invoice</button></div></div><div className="mt-10 border border-champagne/60 bg-[#fffdf9] p-6 sm:p-10"><div className="flex flex-col justify-between gap-8 sm:flex-row"><div><p className="font-editorial text-3xl">Aurelia <span className="text-champagne">&amp;</span> Co.</p><p className="eyebrow mt-2 text-muted">Timeless pieces, crafted to be treasured.</p></div><div><p className="eyebrow text-muted">Invoice number</p><p className="mt-2">{order.number}</p><p className="mt-2 text-sm text-muted">{new Date(order.date).toLocaleDateString()}</p></div></div><div className="my-8 hairline"/><div className="grid gap-6 sm:grid-cols-2"><div><p className="eyebrow text-muted">Billed to</p><p className="mt-3 leading-7">{order.customer.name}<br/>{order.customer.address}<br/>{order.customer.city}, {order.customer.postalCode}<br/>{order.customer.country}<br/>{order.customer.email}</p></div><div><p className="eyebrow text-muted">Payment method</p><p className="mt-3">{order.customer.paymentMethod === "card" ? "Credit / debit card (demo)" : "Cash on delivery"}</p></div></div><div className="mt-8 overflow-x-auto"><table className="w-full min-w-[500px] text-left text-sm"><thead><tr className="border-b border-champagne text-[9px] uppercase tracking-widest text-muted"><th className="py-4">Piece</th><th className="py-4">Qty</th><th className="py-4">Unit price</th><th className="py-4 text-right">Amount</th></tr></thead><tbody>{order.items.map(({ product, quantity }) => <tr key={product.id} className="border-b border-black/10"><td className="py-5"><span className="font-editorial text-xl">{product.name}</span><span className="mt-1 block text-xs text-muted">{product.material}</span></td><td>{quantity}</td><td>{formatPrice(product.price)}</td><td className="text-right">{formatPrice(product.price * quantity)}</td></tr>)}</tbody></table></div><div className="ml-auto mt-8 max-w-xs space-y-3 text-sm"><div className="flex justify-between"><span className="text-muted">Subtotal</span><span>{formatPrice(order.subtotal)}</span></div><div className="flex justify-between"><span className="text-muted">Shipping</span><span>{order.shipping ? formatPrice(order.shipping) : "Complimentary"}</span></div><div className="flex justify-between"><span className="text-muted">Tax</span><span>{formatPrice(order.tax)}</span></div><div className="hairline my-4"/><div className="flex justify-between"><span>Total</span><span className="font-editorial text-3xl">{formatPrice(order.total)}</span></div></div><p className="mt-12 border-t border-champagne/50 pt-6 text-center text-xs leading-6 text-muted">Thank you for choosing Aurelia &amp; Co.<br/>Certified authentic · Crafted to be treasured.</p></div></section>;
}
