import express, { Response } from "express";
import Movie from "../Models/Movie";
import seedMovies from "../utils/seedMovies";

const movieRouter = express.Router();

movieRouter.get("/movies", async (_, res: Response) => {
  let movies = await Movie.findAll();

  if (!movies.length) {
    const moviesFromTMDB = await seedMovies();

    if (moviesFromTMDB.length > 0) {
      const moviesToCreate = moviesFromTMDB.map((movie) => ({
        name: movie.title,
        description: movie.overview,
        poster: process.env.POSTER_BASE_URL + movie.poster_path,
      }));

      try {
        await Movie.bulkCreate(moviesToCreate);

        movies = await Movie.findAll();
      } catch (e) {
        console.log("Error creating movies: ", e);
        throw e;
      }
    }
  }

  res.json(movies);
});

export default movieRouter;
