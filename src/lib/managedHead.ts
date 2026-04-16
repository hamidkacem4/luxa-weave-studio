const MANAGED_HEAD_ATTR = "data-managed-head";

function createManagedElement<K extends keyof HTMLElementTagNameMap>(
  manager: string,
  tagName: K,
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tagName);
  element.setAttribute(MANAGED_HEAD_ATTR, manager);
  document.head.appendChild(element);
  return element;
}

export function clearManagedHead(manager: string) {
  if (typeof document === "undefined") {
    return;
  }

  document.head
    .querySelectorAll(`[${MANAGED_HEAD_ATTR}="${manager}"]`)
    .forEach((element) => element.remove());
}

export function setDocumentTitle(title: string) {
  if (typeof document === "undefined") {
    return;
  }

  document.title = title;
}

export function appendManagedMeta(
  manager: string,
  options: {
    content: string;
    name?: string;
    property?: string;
  },
) {
  const meta = createManagedElement(manager, "meta");

  if (options.name) {
    meta.setAttribute("name", options.name);
  }

  if (options.property) {
    meta.setAttribute("property", options.property);
  }

  meta.setAttribute("content", options.content);
}

export function appendManagedLink(
  manager: string,
  options: {
    href: string;
    rel: string;
    hrefLang?: string;
  },
) {
  const link = createManagedElement(manager, "link");
  link.setAttribute("rel", options.rel);
  link.setAttribute("href", options.href);

  if (options.hrefLang) {
    link.setAttribute("hreflang", options.hrefLang);
  }
}

export function appendManagedScript(
  manager: string,
  options: {
    content: string;
    type?: string;
  },
) {
  const script = createManagedElement(manager, "script");
  script.setAttribute("type", options.type ?? "application/ld+json");
  script.textContent = options.content;
}
