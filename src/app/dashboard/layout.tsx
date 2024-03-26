import type { ReactNode } from "react";
import Image from "next/image";

type LayoutProps = {
  children: ReactNode;
};

function DashboardLayout({ children }: LayoutProps) {
  return (
    <>
      <Image
        src="/images/log-in-laser-background.jpg"
        alt="Spotify Logo"
        fill
        sizes="100vw"
        style={{ objectFit: "cover", zIndex: -1 }}
        className="blur-3xl"
      />
      <section>{children}</section>
    </>
  );
}

export default DashboardLayout;
