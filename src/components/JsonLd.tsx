import Script from "next/script";

type JsonLdEntry = Record<string, unknown>;

type JsonLdProps = {
  data: JsonLdEntry | JsonLdEntry[];
};

const SCHEMA_CONTEXT = "https://schema.org";

function withSchemaContext(entry: JsonLdEntry) {
  if (entry["@context"]) {
    return entry;
  }

  return {
    "@context": SCHEMA_CONTEXT,
    ...entry,
  };
}

function getScriptKey(entry: JsonLdEntry, index: number) {
  const id = entry["@id"];
  const type = entry["@type"];

  if (typeof id === "string") {
    return id;
  }

  if (typeof type === "string") {
    return `${type}-${index}`;
  }

  return `jsonld-${index}`;
}

export default function JsonLd({ data }: JsonLdProps) {
  const entries = (Array.isArray(data) ? data : [data]).map(withSchemaContext);

  return (
    <>
      {entries.map((entry, index) => (
        <Script
          key={getScriptKey(entry, index)}
          id={getScriptKey(entry, index)}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
          strategy="afterInteractive"
        />
      ))}
    </>
  );
}
