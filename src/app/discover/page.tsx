import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import React from "react";

export default async function DiscoverPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main>
      {user ? (
        <h3>Welcome back {user?.user_metadata["username"]}!</h3>
      ) : (
        <p>
          <Link
            href={"/sign-up"}
            className="font-bold hover:underline">
            Sign up
          </Link>{" "}
          or{" "}
          <Link
            href={"/log-in"}
            className="font-bold hover:underline">
            Log in
          </Link>{" "}
          to experience the full features of Muse
        </p>
      )}
    </main>
  );
}
