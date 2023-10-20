import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";

type NavItemProps = {
  icon: IconType;
  href: string;
};

const NavItem = ({ icon: Icon, href }: NavItemProps) => {
  return (
    <Link href={href}>
      <li className="cursor-pointer mb-16">
        <Icon size={54} color="#49A38E" />
      </li>
    </Link>
  );
};

export default NavItem;
