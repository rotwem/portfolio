export interface Project {
  id: number
  title: string
  subtitle: string
  description: string
  media: string[]
  link?: string
  link_comments?: string
}

export interface ProjectsData {
  projects: Project[]
}
