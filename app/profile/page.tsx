import { auth } from "@/app/db";
import Profile from "./profile";
import { redirect } from 'next/navigation';
import { getUser } from "@/app/actions";

export default async function UserPage() {
  const session = auth.getSession();
  const loggedIn = await session.isSignedIn();
  if (!loggedIn) {
    redirect('/');
  }
  const user = await getUser(session.client);

  return (
    <div className="container mx-auto pt-4">
      <h1 className="text-2xl font-normal subpixel-antialiased mb-4">Your profile</h1>
      <Profile user={user} />
    </div>
  )
}
