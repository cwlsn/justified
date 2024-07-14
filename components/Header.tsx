import Link from "next/link";
import AuthButton from "./AuthButton";

export default function Header() {
  return (
    <div className="flex flex-col w-full">
      <nav className="flex flex-row py-4">
        <div className="flex flex-row items-center gap-4 mr-auto text-sm">
          <Link href="/" className="mr-2 text-xl font-extrabold text-cyan-200">
            Justified
          </Link>
          <Link href="/growth">Growth</Link>
          <Link href="/cadences">Cadences</Link>
          <Link href="/Onboarding">Onboarding</Link>
        </div>
        <div className="">
          <AuthButton />
        </div>
      </nav>

      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent mb-4" />
    </div>
  );
}
