export interface User {
      id: number;
      username: string;
      login: string;
      name: string;
      avatar_url: string;
      bio?: string;
      followers: number;
      following: number;
      public_repos: number;
      location?: string;
      html_url: string;
      profile_image?: string;
      stars?: number;
      repos?: any[];
    }
    