'use client'
import React from "react";
import { userMenuItems } from "@/constants/i18n";
import Link from 'next/link';
import clsx from "clsx";
import { useSelectedLayoutSegments } from 'next/navigation';
import { Menu, MenuItem } from "@/components/menu";
import { User } from "@/dbschema/interfaces";

export default function UserMenu({
  signout,
  user
}: {
  signout: string;
  user: User | null
}) {
  const activeSegment = useSelectedLayoutSegments();

  const menu = userMenuItems.filter(item => !item.hide).map((item, index) => {
    return (
      <MenuItem
        key={index}
        className={
          clsx(
            "text-gray-700 min-w-[120px] py-1 pl-4 last-of-type:border-b-0 hover:text-white hover:bg-slate-400 focus:outline-0 disabled:opacity-75",
            {
              "text-white bg-slate-400": activeSegment.findLast(element => element === item.targetSegment),
            }
          )
        }
      >
        {item.targetSegment === 'signout' ?
          (
            <a href={signout} className="no-underline">{item.text}</a>
          ) : (
            <Link href={item.path}>{item.text}</Link>
          )
        }
      </MenuItem>
    )
  }
  )

  return (
    <>
      <Menu id="hooks-menu" className="text-base pt-2">
        <div className="mx-4 font-semibold">{user?.name}</div>
        <div className="mx-4 pb-2 mb-2 border-b border-stone-400">{user?.email}</div>
        {menu}
      </Menu>
    </>
  )
}


