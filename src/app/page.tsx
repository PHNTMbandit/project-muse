import Image from "next/image";
import { ThemeModeToggle } from "@/components/ui/themeModeToggle";
import { invoices } from "../lib/placeholder-data";

export default function Home() {
  return (
    <main>
      <ThemeModeToggle />
      {invoices.map((invoice) => (
        <div key={invoice.id}>{invoice.date}</div>
      ))}
    </main>
  );
}
