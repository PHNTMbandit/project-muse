import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <>
      <section className="p-8">{children}</section>
    </>
  );
}

export default Layout;
