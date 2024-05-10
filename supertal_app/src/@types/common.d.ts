export interface IMovie {
  id: number;
  name: string;
  description: string;
  poster: string;
}

export interface IAppState {
  movies: IMovie[];
  favouriteMovies: string[];
}
