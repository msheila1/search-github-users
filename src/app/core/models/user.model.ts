export interface User {
  id: number;
  login: string;
  name?: string;
  bio?: string;
  followers: number;
  following: number;
  public_repos: number; 
  location?: string;
  avatar_url: string;
}
