import React from "react";
import { auth } from "@/app/db";
import { getUser } from "@/app/actions";
import Navbar from "@/components/navbar";
import clsx from 'clsx';
import styles from '@/app/layout.module.css'
import Image from 'next/image';
import Link from 'next/link'
import UserAvatar from "@/app/admin/user/components/userAvatar";
import Login from "@/app/admin/user/components/login";


export default async function Header() {
  const session = auth.getSession();
  const loggedIn = await session.isSignedIn();
  const currentUser = await getUser(session.client);
  // const email = currentUser?.email || "...";


  return (
    <div className="container mx-auto min-w-[330px] px-4">
      <div className="flex items-center justify-start flex-wrap">
        <Link className={clsx(styles.logo_link, "justify-self-start block mt-4 md:inline-block md:mt-0 text-center")} href="/">
          <Image src="/logo.png" alt="Home" width={133} height={123} className={styles.logo} />
        </Link>
        <Navbar />
        <nav className="flex items-center justify-end flex-wrap md:flex-grow justify-self-end">
          {loggedIn ? (
            <UserAvatar user={currentUser} path={auth.getSignoutUrl()} />
          ) : (
            <Login path={auth.getBuiltinUIUrl()} title='Sign In' />
          )
          }
        </nav>
      </div>
    </div >

  )
}
