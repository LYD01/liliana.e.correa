"use client";

import { WorkModalContent } from "@/app/_components";
import { WORKS_DATA } from "@/app/_constants";
import { useRouter } from "next/navigation";
import { use } from "react";


interface PageProps {
  params: Promise<{
    id: string;
    name: string;
  }>;
}

export default function WorkPage({ params }: PageProps) {
  const { id, name } = use(params);
  const router = useRouter();

  // Decode the name parameter (Next.js provides it decoded, but ensure it's properly handled)
  const decodedName = decodeURIComponent(name);

  const work = WORKS_DATA.find(work => {
    // Normalize the work URL for comparison
    const normalizedWorkUrl = work.url.startsWith('/') ? work.url.slice(1) : work.url;
    const expectedUrl = `works/${id}/${decodedName}`;
    return normalizedWorkUrl === expectedUrl || work.url === `/works/${id}/${decodedName}`;
  });

  if (!work) {
    return (
      <div className="min-h-screen flex items-center justify-center night-sky-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-white">Work not found</h1>
          <button
            onClick={() => router.push('/')}
            className="text-blue-500 hover:underline"
          >
            Return to home
          </button>
        </div>
      </div>
    );
  }

  const handleClose = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen night-sky-background flex items-center justify-center p-0 md:p-4 lg:p-6 xl:p-8 overflow-y-auto">
      <div className="w-full h-screen max-h-screen md:w-[92%] md:h-[96vh] lg:w-[90%] lg:h-[94vh] xl:w-[88%] xl:h-[92vh] md:max-h-[96vh] lg:max-h-[94vh] xl:max-h-[92vh] flex items-center justify-center my-0 md:my-auto">
        <WorkModalContent work={work} onClose={handleClose} />
      </div>
    </div>
  );
}
