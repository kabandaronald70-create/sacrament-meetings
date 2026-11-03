"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "All Meetings", href: "/meetings" },
    { name: "Current Meeting", href: "/meetings/current" },
  ];

  return (
    <nav className="bg-slate-700 text-white">
      <ul className="container mx-auto px-4 flex gap-6 py-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={
                pathname === link.href
                  ? "text-yellow-400 font-bold underline"
                  : "hover:text-slate-300"
              }
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
