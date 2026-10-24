import type { Product } from "@/types";

export const products: Product[] = [
  {
    id: "p01",
    slug: "solene-diamond-ring",
    name: "Solène Diamond Ring",
    category: "Rings",
    price: 4850,
    description:
      "A luminous solitaire that lets the beauty of a single diamond speak in a whisper, not a shout.",
    material: "18k yellow gold · 0.70ct responsibly sourced diamond",
    images: ["/images/solene-ring.jpg"],
    stock: 4,
    details: [
      "Hand-finished in 18k gold",
      "Conflict-free, independently graded diamond",
      "Complimentary resizing within 30 days",
    ],
  },
  {
    id: "p02",
    slug: "celeste-signet-ring",
    name: "Céleste Signet Ring",
    category: "Rings",
    price: 2150,
    description:
      "A modern heirloom with a softly sculpted profile and a quiet, architectural presence.",
    material: "18k yellow gold",
    images: ["/images/celeste-ring.jpg"],
    stock: 7,
    details: [
      "Solid 18k gold",
      "Polished by hand",
      "Designed for everyday wear",
    ],
  },
  {
    id: "p03",
    slug: "nocturne-eternity-ring",
    name: "Nocturne Eternity Ring",
    category: "Rings",
    price: 6200,
    description:
      "A continuous line of brilliant light, set low and close for a beautifully tactile finish.",
    material: "Platinum · pavé diamonds, 1.10ct total",
    images: ["/images/nocturne-ring.jpg"],
    stock: 2,
    details: [
      "950 platinum",
      "Micro pavé setting",
      "Made to order in select sizes",
    ],
  },
  {
    id: "p04",
    slug: "lumiere-pendant",
    name: "Lumière Pendant",
    category: "Necklaces",
    price: 3250,
    description:
      "A delicate diamond pendant suspended on a fine chain: an intimate glimmer, close to the heart.",
    material: "18k yellow gold · diamond",
    images: ["/images/lumiere-necklace.jpg"],
    stock: 6,
    details: [
      "Adjustable 16–18 inch chain",
      "Spring-ring clasp",
      "Presented in signature gift packaging",
    ],
  },
  {
    id: "p05",
    slug: "mira-pearl-collar",
    name: "Mira Pearl Collar",
    category: "Necklaces",
    price: 3900,
    description:
      "Silken freshwater pearls meet a minimal gold clasp in a study of timeless restraint.",
    material: "Freshwater pearls · 18k gold clasp",
    images: ["/images/mira-necklace.jpg"],
    stock: 3,
    details: [
      "Hand-selected pearls",
      "18k gold clasp",
      "Natural variations make each piece unique",
    ],
  },
  {
    id: "p06",
    slug: "astrid-chain-necklace",
    name: "Astrid Chain Necklace",
    category: "Necklaces",
    price: 1780,
    description:
      "An elegant, weighty chain with fluid links that catch the light with every movement.",
    material: "18k yellow gold vermeil over sterling silver",
    images: ["/images/astrid-necklace.jpg"],
    stock: 8,
    details: [
      "42 cm chain with 5 cm extender",
      "Recycled sterling silver base",
      "Layer beautifully or wear alone",
    ],
  },
  {
    id: "p07",
    slug: "elise-drop-earrings",
    name: "Élise Drop Earrings",
    category: "Earrings",
    price: 2680,
    description:
      "Graceful drops with a fine, fluid silhouette designed to move with the wearer.",
    material: "18k yellow gold · white topaz",
    images: ["/images/elise-earrings.jpg"],
    stock: 5,
    details: [
      "Secure butterfly backs",
      "Sold as a pair",
      "Lightweight, balanced construction",
    ],
  },
  {
    id: "p08",
    slug: "oriel-huggie-earrings",
    name: "Oriel Huggie Earrings",
    category: "Earrings",
    price: 1420,
    description:
      "A close-fitting gold huggie with a sculptural curve, quietly striking from every angle.",
    material: "18k yellow gold",
    images: ["/images/oriel-earrings.jpg"],
    stock: 9,
    details: [
      "Sold as a pair",
      "Hinged click closure",
      "Made for day-to-evening wear",
    ],
  },
  {
    id: "p09",
    slug: "solstice-cuff",
    name: "Solstice Cuff",
    category: "Bracelets",
    price: 2950,
    description:
      "A pure, open cuff that traces the wrist with a soft architectural line.",
    material: "18k yellow gold",
    images: ["/images/solstice-bracelet.jpg"],
    stock: 4,
    details: [
      "Open cuff, gently adjustable",
      "Solid 18k gold",
      "Hand-polished finish",
    ],
  },
  {
    id: "p10",
    slug: "ines-tennis-bracelet",
    name: "Inès Tennis Bracelet",
    category: "Bracelets",
    price: 8900,
    description:
      "A refined procession of brilliant stones, articulated for a fluid and effortless drape.",
    material: "18k white gold · 2.0ct lab-grown diamonds",
    images: ["/images/ines-bracelet.jpg"],
    stock: 1,
    details: [
      "Box clasp with safety catch",
      "Independently graded stones",
      "Complimentary insured delivery",
    ],
  },
];

export const getProduct = (slug: string) =>
  products.find((product) => product.slug === slug);

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
