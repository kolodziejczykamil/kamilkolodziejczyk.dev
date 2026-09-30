import {
  EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  person,
  SITE_URL,
  siteMeta,
  stack,
} from "@/content/profile";

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

function toJsonLd(value: object): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function StructuredData() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: person.name,
        alternateName: person.alternateName,
        jobTitle: person.role,
        description: siteMeta.description,
        url: SITE_URL,
        email: `mailto:${EMAIL}`,
        image: `${SITE_URL}/opengraph-image`,
        address: { "@type": "PostalAddress", addressCountry: person.country },
        sameAs: [LINKEDIN_URL, GITHUB_URL],
        knowsAbout: stack.groups.flatMap((group) => group.items.map((skill) => skill.label)),
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: person.name,
        inLanguage: "en",
        publisher: { "@id": PERSON_ID },
      },
      {
        "@type": "ProfilePage",
        url: SITE_URL,
        name: siteMeta.title,
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: { "@id": PERSON_ID },
        primaryImageOfPage: `${SITE_URL}/opengraph-image`,
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(graph) }} />;
}
