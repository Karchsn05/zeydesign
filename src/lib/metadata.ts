import type { Metadata } from "next";

import { getSiteConfig } from "@/lib/catalog";
import { getSiteUrl } from "@/lib/supabase";

function getMetadataBase() {
  try {
    return new URL(getSiteUrl());
  } catch {
    return undefined;
  }
}

export function buildPageMetadata(input: {
  title: string;
  description: string;
  path?: string;
  indexable?: boolean;
}) {
  const config = getSiteConfig();
  const metadataBase = getMetadataBase();
  const path = input.path ?? "/";
  const indexable = input.indexable ?? true;

  return {
    metadataBase,
    title: input.title,
    description: input.description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      siteName: config.brandName,
      title: input.title,
      description: input.description,
      url: path,
      images: [
        {
          url: "/og.svg",
          width: 1200,
          height: 630,
          alt: `${config.brandName} vitrin paylaşım görseli`,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: input.title,
      description: input.description,
      images: ["/og.svg"],
    },
    robots: {
      index: indexable,
      follow: indexable,
    },
  } satisfies Metadata;
}
