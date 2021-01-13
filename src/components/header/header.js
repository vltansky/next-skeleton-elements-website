import s from "./header.module.css";
import menuList from "../menu-list";
import Link from "next/link";
import { ReactComponent as Logo } from "@/img/logo.svg";

export default function Header() {
  return (
    <header className="bg-white shadow-lg py-4 border-primary sticky top-0 z-40">
      <div className="max-w-5xl mx-auto flex justify-between">
        <Link href="/">
          <a className="flex items-center">
            <Logo
              width="24"
              height="24"
              src="/images/logo.svg"
              alt="Skeleton Elements logo"
            />
            <div className="font-medium text-lg text-black">
              Skeleton Elements
              <sup className={`text-gray-500 ml-1`}>v3.3.0</sup>
            </div>
          </a>
        </Link>
        <nav>
          {menuList.map(({ name, link }) => (
            <Link key={link} href={link}>
              <a className="mr-5 font-semibold">{name}</a>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
