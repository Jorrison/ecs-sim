import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "line" | "ghost";
};

const styles: Record<NonNullable<Props["variant"]>, string> = {
  primary: "bg-burgundy text-paper hover:bg-burgundy-deep",
  line: "border border-burgundy bg-card text-burgundy hover:bg-paper",
  ghost: "bg-transparent text-ink hover:bg-paper",
};

export function Button({ variant = "primary", className = "", type = "button", ...props }: Props) {
  return (
    <button
      type={type}
      className={`inline-flex min-h-11 items-center justify-center gap-2 px-4 text-sm font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40 ${styles[variant]} ${className}`}
      {...props}
    />
  );
}
