import { LogoMe } from "@/components/global/LogoMe";
import { INSTAGRAM } from "@/config/initial";
import { getCurrentYear } from "@/utils/utils";
import { Instagram } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="dark:border-gray-850 w-full border-t border-gray-200 bg-gray-100 dark:bg-primary">
      <div className="container flex max-w-6xl flex-col-reverse items-center justify-between p-6 px-4 md:flex-row md:px-6">
        <div className="my-4 flex flex-col md:my-0 md:flex-row">
          <p className="text-center text-base tracking-wider text-gray-500 dark:text-gray-400">
            © {getCurrentYear()} Creado por Manuel Entrena
          </p>
          <div className="mx-auto mt-4 block md:mx-0 md:ml-2 md:mt-0" style={{ color: "white" }}>
            <a
              href="https://www.instagram.com/manuel_entrena/"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer"
            >
              <LogoMe />
            </a>
          </div>
        </div>
        <div className="flex flex-col items-center md:flex-row">
          <Link
            className="hover:underline-gray-50 mb-2 mt-0 text-base tracking-wider text-gray-500 hover:underline md:my-4 md:pr-4 dark:text-gray-400"
            href="/politica-privacidad"
          >
            Política de Privacidad
          </Link>
          <Link
            className="hover:underline-gray-50 mb-2 mt-0 text-base tracking-wider text-gray-500 hover:underline md:my-4 md:pr-4 dark:text-gray-400"
            href="/politica-cookies"
          >
            Política de Cookies
          </Link>
          <div className="flex">
            <a className="cursor-pointer p-0 pr-2" href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
              <Instagram className="h-10 w-10" color="white" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
