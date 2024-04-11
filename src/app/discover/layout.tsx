import { Header } from "@/components/header";
import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default async function DiscoverLayout({ children }: LayoutProps) {
  return (
    <main className="p-16">
      <Header />
      <section className="pt-4">{children}</section>
    </main>
  );
}
