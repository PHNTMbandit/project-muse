import { Header } from "@/components/header";
import { createClient } from "@/utils/supabase/server";
import React from "react";

export default async function GamePageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <section className="p-8">
      <Header user={user} />
      {children}
    </section>
  );
}
