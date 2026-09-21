import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="bg-band">
      <div className="flex items-center justify-center gap-6 px-6 py-8 sm:gap-10 sm:px-10 sm:py-10">
        <div className="flex flex-col gap-3 text-neutral-950">
          {/* Kept on one line and scaled with the window instead: a wrapped
              heading's box fills the whole row, which pushes the right-aligned
              "by vihaan" away from the end of the title. */}
          <h1 className="font-pixel text-[clamp(1.5rem,8.5vw,4.5rem)] leading-none whitespace-nowrap">
            <Link href="/">garbage time</Link>
          </h1>
          <p className="text-right text-xl leading-none sm:text-2xl">by vihaan</p>
        </div>
        <Image
          src="/logo.png"
          alt="garbage time logo, a pixel basketball in a trash can"
          width={189}
          height={256}
          priority
          className="h-28 w-auto shrink-0 sm:h-44"
        />
      </div>
    </header>
  );
}
