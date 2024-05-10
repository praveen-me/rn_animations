import axios from "axios";
import { MovieResponse } from "src/@types";

const API_KEY = process.env.MOVIE_DB_API_KEY;

async function seedMovies() {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/popular",
      {
        params: {
          api_key: API_KEY,
        },
      }
    );

    const movies: MovieResponse[] = response.data.results;

    return movies;
  } catch (error) {
    console.error("Error fetching movies from TMDB:", error);
    throw error;
  }
}

export default seedMovies;
