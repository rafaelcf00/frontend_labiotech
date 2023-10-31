import React from "react";

type ContenMainProps = {
  children: React.ReactNode;
  title?: string;
};

const ContentMain = ({ children, title }: ContenMainProps) => {
  return (
    <div className="flex justify-center w-full  mt-16">
      <div className="flex flex-col items-center w-full">
        <h1 className="text-primary-blue text-3xl font-bold mt-9">{title}</h1>
        <div className="mt-4  w-full flex justify-center">{children}</div>
      </div>
    </div>
  );
};

export default ContentMain;
