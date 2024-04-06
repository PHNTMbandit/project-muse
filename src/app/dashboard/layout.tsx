import { Header } from "@/components/header";
import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <section className="pt-8">{children}</section>
    </>
  );
}
