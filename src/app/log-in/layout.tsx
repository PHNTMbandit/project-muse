import Image from "next/image";
import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
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
      <section className="flex flex-col w-screen h-screen items-center justify-center">
        {children}
      </section>
    </>
  );
}

export default Layout;
