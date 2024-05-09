import { Skeleton } from "@/components/ui/skeleton";

export default function GameLoading() {
  return (
    <section className="flex flex-col lg:grid grid-rows-12 grid-cols-12 gap-4">
      <Skeleton className="rounded-3xl col-span-4 h-[112px]" />
      <Skeleton className="rounded-3xl col-span-4 row-start-2 row-span-2" />
      <Skeleton className="rounded-3xl col-start-5 col-span-8 row-span-6" />
      <Skeleton className="rounded-3xl col-span-4 row-span-3 row-start-4" />
      <Skeleton className="rounded-3xl col-span-7 row-span-5" />
      <Skeleton className="rounded-3xl col-span-5 col-start-8 row-span-4" />
      <Skeleton className="rounded-3xl col-span-5 col-start-8" />
    </section>
  );
}
