import React from "react";

type ItemProps = {
  children: React.ReactNode;
};

const Item = ({ children }: ItemProps) => {
  return (
    <div className="w-full bg-[#ECEDEE] p-3 md:p-6 rounded-lg mb-4  ">
      {children}
    </div>
  );
};

export default Item;
