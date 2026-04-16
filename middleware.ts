import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  fromCollectionRouteSlug,
  toCollectionRouteSlug,
} from "@/lib/collectionSlugs";
import {
  CANONICAL_HOST,
  DEFAULT_LOCALE,
  PREFIXED_LOCALES,
} from "@/lib/site";

function isLocalHost(hostname: string) {
  return hostname === "localhost" || hostname === "127.0.0.1";
}

function isPreviewHost(hostname: string) {
  return hostname.endsWith(".vercel.app");
}

function resolveRequestLocale(pathname: string) {
  const localeMatch = pathname.match(/^\/(fr|ko|it)(?:\/|$)/);
  if (localeMatch) return localeMatch[1];
  return DEFAULT_LOCALE;
}

function resolveCanonicalPath(pathname: string) {
  if (pathname === "/en") {
    return "/";
  }

  if (pathname.startsWith("/en/")) {
    const unprefixedPath = pathname.replace(/^\/en(?=\/|$)/, "");
    return unprefixedPath || "/";
  }

  const prefixedLocalePattern = PREFIXED_LOCALES.join("|");
  const collectionMatch = pathname.match(
    new RegExp(`^/(?:(?:(${prefixedLocalePattern}))/)?collections/(.+)$`),
  );

  if (!collectionMatch) {
    return pathname;
  }

  const [, localePrefix, routeSlug] = collectionMatch;
  const locale = localePrefix ?? DEFAULT_LOCALE;
  const decodedRouteSlug = decodeURIComponent(routeSlug);
  const canonicalSlug = toCollectionRouteSlug(fromCollectionRouteSlug(decodedRouteSlug));
  const prefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
  const canonicalPath = `${prefix}/collections/${canonicalSlug}`;

  if (decodedRouteSlug === canonicalSlug) {
    return pathname;
  }

  return canonicalPath;
}

export function middleware(request: NextRequest) {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const requestHost = forwardedHost ?? request.headers.get("host") ?? request.nextUrl.host;
  const hostname = requestHost.split(":")[0].toLowerCase();
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-magtexco-locale", resolveRequestLocale(request.nextUrl.pathname));

  // Never redirect on local dev or Vercel preview deployments
  if (isLocalHost(hostname) || isPreviewHost(hostname)) {
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  const url = request.nextUrl.clone();
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const protocol = (forwardedProto ?? url.protocol.replace(":", "")).toLowerCase();

  // Resolve any path alias redirects (e.g. / → /en or browser detected locale)
  const resolvedPath = resolveCanonicalPath(url.pathname);

  // Build the canonical URL in one atomic step — no chains possible
  const needsRedirect =
    protocol !== "https" ||
    hostname !== CANONICAL_HOST ||
    resolvedPath !== url.pathname;

  if (!needsRedirect) {
    // On canonical URLs, add Link header so bots see it at the HTTP level
    const canonicalUrl = `https://${CANONICAL_HOST}${url.pathname}${url.search}`;
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
    response.headers.set("Link", `<${canonicalUrl}>; rel="canonical"`);
    return response;
  }

  // Single 301 hop directly to the fully-resolved canonical URL
  const canonicalUrl = new URL(
    `https://${CANONICAL_HOST}${resolvedPath}${url.search}`
  );
  return NextResponse.redirect(canonicalUrl, 301);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|_next/data|favicon).*)"],
};
