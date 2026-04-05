import type { Metadata } from "next";

import { LandingSections } from "@/components/site/landing-sections";
import { getLandingSections, getSocialLinks } from "@/lib/catalog";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Hakkimizda",
  description: "ZeyDesign'in butik uretim anlayisini, marka tonunu ve calisma bicimini ogren.",
  path: "/hakkimizda",
});

export default function AboutPage() {
  return <LandingSections page="about" sections={getLandingSections("about")} socialLinks={getSocialLinks()} />;
}
