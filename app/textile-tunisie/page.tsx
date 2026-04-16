import TextileTunisiePage, {
  generateMetadata as generateTextileMetadata,
} from "../[locale]/textile-tunisie/page";

export const generateMetadata = () =>
  generateTextileMetadata({ params: { locale: "en" } });

export default function TextileTunisieRootPage() {
  return <TextileTunisiePage params={{ locale: "en" }} />;
}
