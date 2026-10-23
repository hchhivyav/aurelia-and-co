export type Category = "Rings" | "Necklaces" | "Earrings" | "Bracelets";
export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  price: number;
  description: string;
  material: string;
  images: string[];
  stock: number;
  details: string[];
}
export interface CartLine { productId: string; quantity: number; }
export interface Customer {
  name: string; email: string; phone: string; address: string;
  city: string; postalCode: string; country: string; paymentMethod: "card" | "cod";
}
export interface Order {
  number: string; date: string; customer: Customer;
  items: { product: Product; quantity: number }[];
  subtotal: number; shipping: number; tax: number; total: number;
}
