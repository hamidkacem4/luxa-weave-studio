import HomePage, { generateMetadata as generateHomeMetadata } from "./[locale]/page";

export const generateMetadata = () => generateHomeMetadata({ params: { locale: "en" } });

export default function RootPage() {
  return <HomePage params={{ locale: "en" }} />;
}
