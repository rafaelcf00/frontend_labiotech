import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { BiLogOutCircle } from "react-icons/bi";
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";

const Header = () => {
  const router = useRouter();
  const onLogout = () => {
    signOut({ redirect: false }).then(() => {
      toast.success("Deslogado com sucesso");
      router.push("/");
    });
  };
  return (
    <header className="flex justify-center items-center w-full h-16 bg-primary-blue fixed top-0 ">
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
      <div
        onClick={() => onLogout()}
        className="absolute right-12 cursor-pointer"
      >
        <BiLogOutCircle size={36} color="white" />
      </div>
    </header>
  );
};

export default Header;
