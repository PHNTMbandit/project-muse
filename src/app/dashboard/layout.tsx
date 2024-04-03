import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

function DashboardLayout({ children }: LayoutProps) {
  return (
    <>
      <section>{children}</section>
    </>
  );
}

export default DashboardLayout;
