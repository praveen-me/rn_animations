// src/models.ts
export interface Movie {
  id: number;
  name: string;
  description: string;
  running_time: string;
}

export interface Favorite {
  userId: number;
  movieId: number;
}

export interface Comment {
  movieId: number;
  userId: number;
  comment: string;
  timestamp: Date;
}
