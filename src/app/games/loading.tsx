import { Skeleton } from "@/components/ui/skeleton";

export default function GamePageLoading() {
  const skeletonAmount = 15;
  return (
    <section className="flex flex-wrap items-center justify-center gap-4">
      {[...Array(skeletonAmount)].map((_, index) => (
        <Skeleton
          key={index}
          className="aspect-video w-64 rounded-3xl"
        />
      ))}
    </section>
  );
}
