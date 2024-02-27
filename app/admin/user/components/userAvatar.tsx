'use client'
import React from "react";
import { User } from "@/dbschema/interfaces";
import Image from "next/image";
import UserMenu from "@/app/admin/user/components/userMenu";
import { useDropdown, DropdownContext } from '@mui/base/useDropdown';
import MenuButton from "@/components/menu/menuButton";


export default function UserAvatar({ user, path }: { user: User | null, path: string }) {
  // console.log(user?.identity?.created_at)
  const { contextValue: dropdownContextValue } = useDropdown();

  /*   const createHandleMenuClick = (menuItem: string) => {
      return () => {
        console.log(`Clicked on ${menuItem}`);
      };
    }; */

  return (
    <>
      <DropdownContext.Provider value={dropdownContextValue}>
        <MenuButton>
          <div className="overflow-hidden border-white border-2 border-solid rounded-full cursor-pointer">
            {user?.avatar ? (
              <Image
                src={`${user?.avatar || ""}`}
                alt={`${user?.email || ""}`}
                width={48}
                height={48}
                quality={100}
                className="object-cover w-12 h-12 text-center indent-[10000px]"
              />)
              : (
                <div className="w-12 h-12 text-purple-100 text-2xl hover:bg-yellow-500 uppercase flex items-center justify-center">
                  {user?.email?.substring(0, 2)}
                </div>
              )
            }
          </div>
        </MenuButton>

        <UserMenu user={user} signout={path} />

      </DropdownContext.Provider>
    </>
  )
}
