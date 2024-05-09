import { createClient } from "@/utils/supabase/server";
import React from "react";

export default async function DiscoverPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="">
      <h3>Welcome back {user?.user_metadata["username"]}!</h3>
    </main>
  );
}
