import React from "react";
import Item from "../Item";

type DashboardItemProps = {
  children: React.ReactNode;
  marginRigth?: boolean;
};

const DashboardItem = ({ children, marginRigth }: DashboardItemProps) => {
  return (
    <Item marginRigth={marginRigth}>
      <div>{children}</div>
    </Item>
  );
};

export default DashboardItem;
