export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  screenshots: string[];
  category: string;
  genre: string[];
  rating: number;
  downloads: number;
  size: string;
  releaseDate: string;
  requirements: {
    minimum: {
      os: string;
      processor: string;
      memory: string;
      graphics: string;
      storage: string;
    };
    recommended: {
      os: string;
      processor: string;
      memory: string;
      graphics: string;
      storage: string;
    };
  };
  price: number;
  featured: boolean;
  popular: boolean;
  new: boolean;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  isLoggedIn: boolean;
}

export interface Review {
  id: string;
  gameId: string;
  userId: string;
  username: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Filter {
  category: string;
  genre: string[];
  popularity: 'all' | 'popular' | 'new';
  size: 'all' | 'small' | 'medium' | 'large';
  rating: number;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}
