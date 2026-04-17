"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";


interface MenuItem {
  href: string
  label: string
}

const menuItems: MenuItem[] = [
  { href: "/", label: "홈" },
  { href: "/about", label: "소개" },
  { href: "/products", label: "제품" },
  { href: "/contact", label: "문의" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}


interface NavLinkProps {
  href: string
  label: string
}

function NavLink({ href, label }: NavLinkProps) {
  const pathname = usePathname()
  const active = pathname === href || pathname.startsWith(`${href}/`)
  
  const linkClass = `rounded-md px-3 py-2 transition-colors hover:bg-slate-100 
    ${active 
      ? 'font-bold text-slate-900 bg-slate-100' 
      : 'font-medium text-slate-700'}`

  return (
    <li>
      <Link
        href={href}
        aria-current={active ? 'page' : undefined}
        className={linkClass}
      >
        {label}
      </Link>
    </li>
  )
}

export default function MainNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="메인 메뉴">
      <ul className="flex gap-2 text-sm">
        {menuItems.map((item) => (
          <NavLink 
            key={item.href}
            href={item.href}
            label={item.label}
          />
        ))}
      </ul>
    </nav>
  );
}
