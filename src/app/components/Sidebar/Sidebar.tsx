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
        <NavItem icon={BiSolidDashboard} href="/dashboard" />
        <NavItem
          target="_blank"
          icon={BiSolidBarChartAlt2}
          href="https://devrafaelcesar.grafana.net/d/016564f9-43ce-4471-81b2-eb1eccc829dc/labiotech-pi?orgId=1&refresh=1m"
        />
      </ul>
    </aside>
  );
};

export default Sidebar;
