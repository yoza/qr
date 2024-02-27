'use client'
import React from "react"
import { User } from '@/dbschema/interfaces';
import UserForm from "../admin/user/components/userForm";


export default function Profile({ user }: { user: User | null }) {

  return (
    <div>
      {user
        ? <UserForm user={user} />
        : null
      }
    </div>
  )
}
