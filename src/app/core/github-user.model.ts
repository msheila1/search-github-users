export interface GithubUser {
    login: string;            // Username
    name?: string;            // Name
    bio?: string;             // Description
    followers: number;        // Followers
    following: number;        // Following
    public_repos?: number;    // Stars (número de repositórios públicos, pois o GitHub não fornece estrelas diretamente no endpoint de usuários)
    location?: string;        // Location
    avatar_url: string;       // Profile Image
  }
  