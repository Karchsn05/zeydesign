import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string | null;
  title: string;
  description?: string | null;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, description, align = "left" }: Props) {
  return (
    <div className={cn("space-y-3", align === "center" && "mx-auto max-w-3xl text-center")}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--brand-primary)]">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-3xl leading-tight text-stone-900 sm:text-4xl lg:text-5xl">{title}</h2>
      {description ? <p className="max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">{description}</p> : null}
    </div>
  );
}
