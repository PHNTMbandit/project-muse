import { Header } from "@/components/header";
import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

function DashboardLayout({ children }: LayoutProps) {
  return (
    <div className="p-4 space-y-8">
      <Header />
      <section>{children}</section>
    </div>
  );
}

export default DashboardLayout;
