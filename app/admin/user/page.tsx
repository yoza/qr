import { auth } from "@/app/db";
import Customers from "./components/customers";
import { redirect } from 'next/navigation';


export default async function UserPage() {
  const session = auth.getSession();
  const loggedIn = await session.isSignedIn();
  if (!loggedIn) {
    redirect('/');
  }

  return (
    <div className="container mx-auto pt-4">
      <h1 className="text-2xl font-normal subpixel-antialiased mb-4">Edit customer</h1>
      <Customers />
    </div>
  )
}
