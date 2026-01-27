/**
 * Reusable JSON-LD component for structured data
 * Renders schema.org structured data in a script tag
 */

// Generic type for schema objects - must have @context and @type at minimum
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SchemaObject = Record<string, any>;

interface JsonLdProps {
  data: SchemaObject | SchemaObject[];
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}

/**
 * Renders multiple JSON-LD schemas
 */
interface MultiJsonLdProps {
  schemas: SchemaObject[];
}

export function MultiJsonLd({ schemas }: MultiJsonLdProps) {
  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
    </>
  );
}
