import type { Metadata } from "next";

import { LandingSections } from "@/components/site/landing-sections";
import { getLandingSections, getSocialLinks } from "@/lib/catalog";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Hakkımızda",
  description: "ZeyDesign'in butik üretim anlayışını, marka tonunu ve çalışma biçimini öğren.",
  path: "/hakkimizda",
});

export default function AboutPage() {
  return <LandingSections page="about" sections={getLandingSections("about")} socialLinks={getSocialLinks()} />;
}
