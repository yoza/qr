// app/auth/[...auth]/route.ts
import { redirect } from "next/navigation";
import { auth } from "@/app/db";
import { createUser } from "@/app/actions";

export const { GET, POST } = auth.createAuthRouteHandlers({
  async onBuiltinUICallback({ error, tokenData, isSignUp }) {
    if (error) {
      return redirect(
        `/?error=${encodeURIComponent(
          `Sign in with built-in UI failed: ${error.message}`
        )}`
      );
    }
    if (!tokenData) {
      return redirect(
        `/?info=${encodeURIComponent(
          `Your email address requires validation before you can sign in. ` +
          `Follow the link in the verification email to continue.`
        )}`
      );
    }
    if (isSignUp) {
      await createUser(tokenData);
    }
    return redirect("/");
  },
  onSignout() {
    redirect("/");
  },
});
