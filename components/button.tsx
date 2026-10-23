import type { ButtonHTMLAttributes, ReactNode } from "react";
export function Button({ children, className = "", variant = "dark", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode; variant?: "dark" | "light" }) {
  return <button className={`outline-button ${variant === "dark" ? "border-ink text-ink" : "border-ivory text-ivory"} ${className}`} {...props}>{children}</button>;
}
