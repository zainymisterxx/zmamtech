export interface Project {
  id: string
  title: string
  description: string
  image_url: string | null
  category: string | null
  created_at: string
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string | null
  created_at: string
}

export interface NavLink {
  label: string
  href: string
}
