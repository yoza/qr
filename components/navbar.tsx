'use client'
import React from "react";
import { menuItems } from "@/constants/i18n";
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import clsx from "clsx";
import BarsIcon from "@/components/svgs/bars.svg";
import { svgProps } from "@/components/svgProps";
import { useDropdown, DropdownContext } from '@mui/base/useDropdown';
import { Menu, MenuItem, MenuButton } from "@/components/menu";

export default function Navbar() {
  const activeSegment = useSelectedLayoutSegment();
  const { contextValue: dropdownContextValue } = useDropdown();

  return (
    <>
      <DropdownContext.Provider value={dropdownContextValue}>
        <div className="flex visible md:invisible justify-end flex-grow md:flex-shrink-0 text-xl px-4 md:absolute md:ml-[10000px]">
          <MenuButton>
            <BarsIcon style={{ ...svgProps, fill: "white", height: "1.5em", width: "1.5em" }} />
          </MenuButton>
        </div>
        <Menu id="main-menu" className="w-full pt-5 text-xl">
          {menuItems.filter(item => !item.hide).map((item, index) => (
            <MenuItem
              key={index}
              className={
                clsx(
                  "p-4 text-gray-700 hover:text-white hover:bg-slate-400 focus:outline-0 border-stone-200 border-b",
                  {
                    "text-white bg-slate-400 ": activeSegment === item.targetSegment,
                  }
                )
              }
            >
              {activeSegment === item.targetSegment ? (
                <span>{item.text}</span>
              ) : (
                <Link href={item.path} className=" w-full inline-block">
                  {item.text}
                </Link>
              )}
            </MenuItem>
          ))}
        </Menu>
      </DropdownContext.Provider>
      <nav className={
        clsx("hidden flex-grow md:flex items-center md:w-auto w-24 absolute justify-start right-4 top-20 md:static h-8 overflow-visible")}>
        {menuItems.filter(item => !item.hide).map((item, index) => (
          <div className="md:flex-grow md:text-center bg-blue-200 md:bg-inherit" key={index}>
            <Link
              href={item.path}
              className={
                clsx(
                  "mt-4 md:mt-0 text-center font-medium text-lg p-0 lg:pr-0 md:pr-2 md:pl-2 text-gray-800",
                  {
                    "md:text-white hover:text-yellow-50 underline": activeSegment === item.targetSegment,
                    "md:text-yellow-50 hover:text-gray-500 no-underline": activeSegment !== item.targetSegment
                  }
                )
              }
            >
              {item.text}
            </Link>
          </div>
        ))}
      </nav>
    </>
  )
}
