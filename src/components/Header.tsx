import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="flex justify-center items-center w-full h-16 bg-primary-blue fixed top-0">
      <div className="flex justify-center items-center">
        <Link href={"/"}>
          <Image
            className="cursor-pointer"
            alt="Logo"
            src={"/images/logo.png"}
            width={200}
            height={200}
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
