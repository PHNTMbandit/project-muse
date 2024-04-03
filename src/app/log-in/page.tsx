import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

const LogInPage = () => {
  return (
    <>
      <div className="space-y-2">
        <h1>Welcome to Muse.</h1>
        <h1>The new way to connect.</h1>
        <h1>Let&apos;s get started.</h1>
      </div>
      <Link href={"/dashboard"}>
        <Button className="relative rounded-xl bg-primary/20 w-full">
          <Image
            src="/images/Spotify-Logo-White.png"
            alt="Spotify Logo"
            sizes="100vw"
            fill
            style={{ objectFit: "contain" }}
            className="p-2"
          />
        </Button>
      </Link>
    </>
  );
};

export default LogInPage;
