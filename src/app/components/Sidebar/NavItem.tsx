import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";
import { usePathname } from "next/navigation";

type NavItemProps = {
  icon: IconType;
  href: string;
  target?: string;
};

const NavItem = ({ icon: Icon, href, target }: NavItemProps) => {
  const pathname = usePathname();
  return (
    <Link target={target} href={href}>
      <li className="cursor-pointer mb-16 ">
        <Icon size={54} color={`${pathname === href ? "#49A38E" : "#fff"}`} />
      </li>
    </Link>
  );
};

export default NavItem;
