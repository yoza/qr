/*eslint no-unused-vars: ["error", { "args": "none" }]*/
import React from "react";
import { type Customer } from "@/lib/redux/slices";
import clsx from "clsx";


interface Props {
  customer: Customer;
  handleChecked: (e: React.ChangeEvent<HTMLInputElement>, c: Customer) => void;
}


export default function CustomerItem({ customer, handleChecked }: Props) {

  return (
    <label htmlFor={customer.id} className={clsx("flex mb-2 p-2 border cursor-pointer hover:bg-sky-100",
      {
        'bg-stone-200': customer.checked === true,
        'bg-white': customer.checked === false,
      })}   
    >
      <div className="p-4">
        <input id={customer.id} className="justify-self-center" hidden type="checkbox" onChange={(e) => handleChecked(e, customer)} checked={customer?.checked ? customer.checked : false}/>
      </div>
      <div className="grid content-center grid-cols-12 gap-4">
        <div className="md:border-r col-span-12 md:col-span-3">{customer.name}</div>
        <div className="col-auto">{customer.email}</div>
      </div>
    </label>
  )
}
