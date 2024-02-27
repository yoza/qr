'use client'
import React from "react"
import UserIcon from "@/components/svgs/user.svg";
import { svgProps } from "@/components/svgProps";

export default function Login({
  title,
  path,
}: {
  path: string
  title: string
}) {

  return (
    <div className="w-12 h-12 flex items-center justify-center overflow-hidden border-white border-2 border-solid rounded-full hover:bg-yellow-500">
      <a className="no-underline" title={title} href={path}>
        <UserIcon style={{ ...svgProps, fill: "white", width: '1.5em', height: '15em' }} />
      </a>
    </div>
  )
}
