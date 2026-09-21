import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/content";

export function ProjectCard({ project }: { project: Project }) {
  const body = (
    <>
      <div className="w-32 shrink-0 sm:w-40 lg:w-48">
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt=""
            width={480}
            height={360}
            className="aspect-[4/3] w-full rounded-md border border-neutral-900/10 object-cover"
          />
        ) : (
          <div className="flex aspect-[4/3] w-full items-center justify-center rounded-md border border-neutral-900/10 bg-neutral-100 font-pixel text-2xl text-neutral-600">
            {project.comingSoon ? "soon" : null}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="font-pixel text-3xl leading-tight group-hover:underline">
          {project.title}
        </h2>
        <p className="text-lg leading-snug text-neutral-700">{project.description}</p>
      </div>
    </>
  );

  // Unfinished projects aren't links, so there's nothing to click into.
  if (project.comingSoon) {
    return <div className="flex gap-5">{body}</div>;
  }

  return (
    <Link href={project.href} className="group flex gap-5">
      {body}
    </Link>
  );
}
