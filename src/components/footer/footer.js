import menuList from "../menu-list";
import Link from "next/link";

const menu = [...menuList].map(({ name, link }) => {
  return (
    <Link key={link} href={link}>
      <a className="mr-4">{name}</a>
    </Link>
  );
});

export default function Footer() {
  return (
    <footer className="border-t-8 border-primary text-center py-4">
      <div className="max-w-5xl mx-auto">
        Skeleton Elements UI for <nav className="inline-block my-2">{menu}</nav>
        <div>
          {new Date().getFullYear()} © Skeleton Elements by{" "}
          <a href="https://github.com/nolimits4web">Vladimir Kharlampidi</a>
        </div>
      </div>
    </footer>
  );
}
