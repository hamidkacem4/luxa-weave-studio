import { ReactNode } from "react";
import { PREFIXED_LOCALES } from "@/lib/site";

export async function generateStaticParams() {
  return PREFIXED_LOCALES.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export default function LocaleLayout({
  children,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  return children;
}
