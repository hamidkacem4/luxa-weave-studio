export const SPECIAL_COLLECTION_SLUG = "t-shirts&tops";
export const SPECIAL_COLLECTION_ROUTE_SLUG = "t-shirts-tops";

export function toCollectionRouteSlug(slug: string) {
  return slug === SPECIAL_COLLECTION_SLUG ? SPECIAL_COLLECTION_ROUTE_SLUG : slug;
}

export function fromCollectionRouteSlug(slug: string) {
  return slug === SPECIAL_COLLECTION_ROUTE_SLUG ? SPECIAL_COLLECTION_SLUG : slug;
}
