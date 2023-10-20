import React from "react";

type ItemProps = {
  children: React.ReactNode;
  marginRigth?: boolean;
};

const Item = ({ children, marginRigth }: ItemProps) => {
  return (
    <div
      className={`w-full bg-[#ECEDEE] p-3 md:p-6 rounded-lg mb-4 ${
        marginRigth === true && "mr-6"
      }`}
    >
      {children}
    </div>
  );
};

export default Item;
