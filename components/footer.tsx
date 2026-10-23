import Link from "next/link";
export function Footer() {
  return <footer className="bg-ink px-6 pb-8 pt-16 text-ivory md:px-12">
    <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-3">
      <div><Link href="/" className="font-editorial text-3xl">Aurelia <span className="text-champagne">&</span> Co.</Link><p className="mt-4 max-w-xs text-sm leading-7 text-white/60">Timeless pieces, crafted to be treasured.</p></div>
      <div><p className="eyebrow text-champagne">Discover</p><div className="mt-5 flex flex-col gap-3 text-sm text-white/70"><Link href="/collections/rings">Rings</Link><Link href="/collections/necklaces">Necklaces</Link><Link href="/collections/earrings">Earrings</Link><Link href="/collections/bracelets">Bracelets</Link></div></div>
      <div><p className="eyebrow text-champagne">The Aurelia promise</p><p className="mt-5 max-w-sm text-sm leading-7 text-white/70">Considered materials. Thoughtful craftsmanship. Pieces to be kept, worn, and passed on.</p><p className="mt-4 text-xs text-white/50">Complimentary shipping & gift packaging · Certified authentic</p></div>
    </div>
    <div className="mx-auto mt-14 max-w-[1400px]"><div className="hairline opacity-40"/><div className="flex flex-col justify-between gap-3 pt-6 text-[9px] uppercase tracking-[.16em] text-white/45 sm:flex-row"><span>© {new Date().getFullYear()} Aurelia & Co.</span><span>Made with intention. Kept for a lifetime.</span></div></div>
  </footer>;
}
