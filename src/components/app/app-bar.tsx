"use client";

import {
  PiChartPieSlice,
  PiClockCounterClockwise,
  PiHouse,
  PiList,
  PiPlusCircle,
} from "react-icons/pi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export interface AppBarProps {}

const AppBar = ({}: AppBarProps) => {
  const pathname = usePathname();

  const buttons = [
    {
      route: "/",
      icon: <PiHouse size={32} />,
    },
    {
      route: "/history",
      icon: <PiClockCounterClockwise size={32} />,
    },
    {
      route: "/add",
      icon: <PiPlusCircle size={48} />,
    },
    {
      route: "/reports",
      icon: <PiChartPieSlice size={32} />,
    },
    {
      route: "/settings",
      icon: <PiList size={32} />,
    },
  ];

  return (
    <nav className="bg-paper w-full sticky bottom-0">
      <ul className="flex justify-between items-center px-8">
        {buttons.map((button, index) => (
          <li
            key={index}
            className={clsx(
              "p-2 rounded-full",
              pathname === button.route && "bg-background",
            )}
          >
            <Link href={button.route}>{button.icon}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AppBar;
