import ContactPage, {
  generateMetadata as generateContactMetadata,
} from "../[locale]/contact/page";

export const generateMetadata = () =>
  generateContactMetadata({ params: { locale: "en" } });

export default function ContactRootPage() {
  return <ContactPage params={{ locale: "en" }} />;
}
