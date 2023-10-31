import React from "react";
import { ImHome3 } from "react-icons/im";
import {
  BiSolidDashboard,
  BiSolidChart,
  BiSolidBarChartAlt2,
} from "react-icons/bi";
import NavItem from "./NavItem";

const Sidebar = () => {
  return (
    <aside className="bg-primary-blue min-h-screen h-full w-20 md:w-24 flex items-center justify-center fixed bottom-0 left-0">
      <ul>
        <NavItem icon={ImHome3} href="/home" />
        <NavItem icon={BiSolidDashboard} href="dashboard" />
        <NavItem icon={BiSolidBarChartAlt2} href="charts" />
      </ul>
    </aside>
  );
};

export default Sidebar;
