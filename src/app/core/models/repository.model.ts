export interface Repository {
  id: number
  name: string
  username: string
  full_name: string
  description: string
  language?: string
  stargazers_count: number
  forks_count: number
  watchers_count: number
  created_at: string
  updated_at: string
  html_url: string
  owner: {
    login: string;
    avatar_url: string;
  }
  login: string
  avatar_url: string
}
