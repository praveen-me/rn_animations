import axios from "axios";

const API_KEY = process.env.API_KEY;

async function fetchMoviesFromTMDB() {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/popular",
      {
        params: {
          api_key: API_KEY,
        },
      }
    );

    const movies = response.data.results;
    // Process the movies data here

    return movies;
  } catch (error) {
    console.error("Error fetching movies from TMDB:", error);
    throw error;
  }
}
