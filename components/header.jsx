import Link from "next/link";
import { Container } from "@/components/container";
import { Logo, LogoMobile } from "@/components/logo";

export default function Header() {
  return (
    <div className="py-6">
      <Container>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <Link href="/" aria-label="Home">
              <Logo color="white" className="hidden h-6 w-auto md:block" />
              <LogoMobile
                color="white"
                className="block h-6 w-auto md:hidden"
              />
            </Link>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            <Link
              href="/load"
              className="inline-block px-4 py-2 hover:ring-1 hover:ring-white"
            >
              Load
            </Link>
            <Link href="/share" className="button-solid-red">
              Share
            </Link>
          </div>
        </nav>
      </Container>
    </div>
  );
}
