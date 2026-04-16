import { collectionsData } from "@/data/collectionsData";
import { toCollectionRouteSlug } from "@/lib/collectionSlugs";
import CollectionPage, {
  generateMetadata as generateCollectionMetadata,
} from "../../[locale]/collections/[slug]/page";

export function generateStaticParams() {
  return Object.keys(collectionsData).map((slug) => ({
    slug: toCollectionRouteSlug(slug),
  }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  return generateCollectionMetadata({ params: { locale: "en", slug: params.slug } });
}

export default function CollectionRootPage({
  params,
}: {
  params: { slug: string };
}) {
  return <CollectionPage params={{ locale: "en", slug: params.slug }} />;
}
