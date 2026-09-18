import Link from "next/link";
import { Button } from "@/app/components/ui/Button";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 bg-white p-8 text-center">
      <h1 className="font-display text-[48px] font-bold leading-[56px] text-neutral-900">
        Vertex
      </h1>
      <p className="max-w-md font-sans text-base text-neutral-500">
        An AI-powered learning platform with intelligent content search.
      </p>
      <Link href="/design-system">
        <Button variant="primary">View Design System</Button>
      </Link>
    </div>
  );
}
