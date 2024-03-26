import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const LogInPage = () => {
  return (
    <div className="flex flex-col gap-4 w-72 h-fit justify-end items-center bg-secondary/50 p-4 rounded-xl shadow-xl ring-1 ring-black/5">
      <h4>Log in</h4>
      <Link
        href={"/dashboard"}
        className="w-full">
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
    </div>
  );
};

export default LogInPage;
