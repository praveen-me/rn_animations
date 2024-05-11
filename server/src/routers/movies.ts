import express, { Response, Request } from "express";
import Movie from "../Models/Movie";
import Comment from "../Models/Comment";
import seedMovies from "../utils/seedMovies";

const movieRouter = express.Router();

// Get all movies
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

// Add a comment to a movie
movieRouter.post(
  "/movies/:movieId/comments",
  async (req: Request, res: Response) => {
    const { movieId } = req.params;
    const { comment } = req.body;

    try {
      const movie = await Movie.findByPk(movieId);

      console.log({ movieId, comment, movie });

      if (!movie) {
        return res.status(404).json({ error: "Movie not found" });
      }

      const newComment = await Comment.create({ movie_id: movieId, comment });

      res.json(newComment);
    } catch (e) {
      console.log("Error adding comment: ", e);
      res.status(500).json({ error: "Failed to add comment" });
    }
  }
);

// Get all comments for a movie
movieRouter.get(
  "/movies/:movieId/comments",
  async (req: Request, res: Response) => {
    const { movieId } = req.params;

    try {
      const movie = await Movie.findByPk(movieId);

      if (!movie) {
        return res.status(404).json({ error: "Movie not found" });
      }

      const comments = await Comment.findAll({ where: { movie_id: movieId } });

      res.json(comments);
    } catch (e) {
      console.log("Error getting comments: ", e);
      res.status(500).json({ error: "Failed to get comments" });
    }
  }
);

// Delete a comment
movieRouter.delete(
  "/movies/:movieId/comments/:commentId",
  async (req: Request, res: Response) => {
    const { movieId, commentId } = req.params;

    try {
      const movie = await Movie.findByPk(movieId);

      if (!movie) {
        return res.status(404).json({ error: "Movie not found" });
      }

      const comment = await Comment.findByPk(commentId);

      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }

      await comment.destroy();

      res.json({ message: "Comment deleted successfully" });
    } catch (e) {
      console.log("Error deleting comment: ", e);
      res.status(500).json({ error: "Failed to delete comment" });
    }
  }
);

export default movieRouter;
