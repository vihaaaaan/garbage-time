export interface Project {
  slug: string;
  title: string;
  description: string;
  href: string;
  // Path under public/. Projects without one get a plain placeholder tile.
  thumbnail?: string;
  comingSoon?: boolean;
}

export const projects: Project[] = [];
