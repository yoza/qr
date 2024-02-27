'use client';
import React, { ChangeEvent, useState, useEffect } from "react";
import { User } from '@/dbschema/interfaces';
import UserForm from "@/app/admin/user/components/userForm";
import { selectAllUsers, selectUsersStatus, selectUsersError, Customer, updateUsers } from "@/lib/redux/slices/usersSlice";
import { useAppSelector, useAppDispatch } from "@/lib/redux";
import { loadUsers } from "@/lib/redux/slices/thunks";
import CustomerItem from "./customer";


export default function Customers() {
  const customers = useAppSelector<Customer[]>(selectAllUsers);
  const usersStatus = useAppSelector(selectUsersStatus);
  const error = useAppSelector(selectUsersError);
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<User>();
  // console.log(error, usersStatus, customers)
  useEffect(() => {
    if (usersStatus === 'idle') {
      dispatch(loadUsers())
    }
  }, [usersStatus, dispatch]);

  const handleChecked = (e: ChangeEvent<HTMLInputElement>, checked?: Customer) => {
    const items: Customer[] | undefined = customers?.map(c => {
      if (!checked || checked && c.id === checked.id && c.id === checked.id) {
        return { ...c, checked: e.target.checked }
      }
      return { ...c, checked: false };
    });
    if (checked) {
      setUser(checked);
    }
    if (items?.length) {
      dispatch(updateUsers(items))
    }
  }

  let content;
  if (usersStatus === "loading") {
    content = <p>...Loading</p>;
  } else if (usersStatus === 'succeeded') {
    content = customers.map(customer => 
      <CustomerItem key={customer.id} customer={customer} handleChecked={handleChecked}/>
    )
  } else if (usersStatus === "failed") {
    content = <p>{ error }</p>
  } 

  return (
    <div className="flex justify-around flex-row flex-wrap gap-x-4">
      <section className="mb-8 lg:mb-0 max-w-4xl">{content}</section>
      {user && <UserForm user={user} />}
    </div>
  )
}
