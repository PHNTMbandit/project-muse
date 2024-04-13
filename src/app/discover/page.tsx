import React from "react";
import { BentoBox } from "@/components/bento-box";
import { createClient } from "@/utils/supabase/server";
import { Showcase } from "@/components/showcase";

export default async function DiscoverPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <main className="flex flex-col items-center"></main>;
}
