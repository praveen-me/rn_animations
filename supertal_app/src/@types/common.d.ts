export interface IMovie {
  id: number;
  name: string;
  description: string;
  poster: string;
}

export interface IComment {
  id: number;
  movieId: number;
  comment: string;
}

export interface IAppState {
  movies: IMovie[];
  favouriteMovies: number[];
  comments: {[key: string]: IComment[]};
}
