import { ReactNode } from "react";
import Providers from "../../src/Providers";

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }, { locale: 'ko' }];
}

export default function LocaleLayout({
  children,
  params: { locale }
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  return (
    <Providers locale={locale}>
      {children}
    </Providers>
  );
}
