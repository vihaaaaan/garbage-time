import { ProjectCard } from "@/components/project-card";
import { SiteHeader } from "@/components/site-header";
import { projects } from "@/lib/content";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-background">
      <SiteHeader />
      <main className="grid w-full max-w-5xl flex-1 content-start gap-x-12 gap-y-10 px-6 py-12 sm:px-10 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </main>
    </div>
  );
}
