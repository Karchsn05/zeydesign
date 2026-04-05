import Image from "next/image";

type Props = {
  className?: string;
};

export function DecorativeSprinkles({ className = "" }: Props) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <Image
        src="/doodles/flower-bloom.svg"
        alt=""
        width={96}
        height={96}
        unoptimized
        aria-hidden="true"
        className="doodle-sway absolute -left-4 -top-4 w-20 opacity-85 sm:w-24"
      />
      <Image
        src="/doodles/ladybug.svg"
        alt=""
        width={48}
        height={48}
        unoptimized
        aria-hidden="true"
        className="absolute right-4 top-6 w-10 rotate-[12deg] opacity-80 sm:w-12"
      />
      <Image
        src="/doodles/leaf-squiggle.svg"
        alt=""
        width={144}
        height={79}
        unoptimized
        aria-hidden="true"
        className="absolute -bottom-3 left-8 w-28 opacity-45 sm:w-36"
      />
    </div>
  );
}
