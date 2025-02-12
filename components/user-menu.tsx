'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const links = [
    { href: "/", label: "Events" },
    { href: "/tickets", label: "My Tickets" },
    { href: "/about", label: "About Project" },
]

const UserMenu = () => {
    const path = usePathname()
  return (
    <div className="md:flex hidden gap-5">
      {links.map((item) => (
        <ul key={item.href}>
            <Link href={item.href} className={` ${item.href === path ? 'text-white' : 'text-gray-400'} text-lg`}>
            <li>{item.label}</li>
            </Link>
        </ul>
      ))}
    </div>
  );
};

export default UserMenu;
