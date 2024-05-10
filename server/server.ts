// src/server.ts
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { Movie, Favorite, Comment } from "./src/models";

const app = express();
app.use(bodyParser.json());

// Assume these are imported from a service layer
const findAllMovies = async (): Promise<Movie[]> => {
  return [
    {
      id: 1,
      name: "Inception",
      description:
        "A thief who steals corporate secrets through the use of dream-sharing technology.",
      running_time: "2h 28m",
    },
  ];
};
const createFavorite = async (favorite: Favorite) => favorite;
const deleteFavorite = async (id: number) => {};
const createComment = async (comment: Comment) => comment;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/movies", async (req: Request, res: Response) => {
  const movies = await findAllMovies();
  res.json(movies);
});

app.post("/movies/favorites", async (req: Request, res: Response) => {
  const favorite = await createFavorite(req.body);
  res.status(201).json(favorite);
});

app.delete("/movies/favorites/:id", async (req: Request, res: Response) => {
  await deleteFavorite(parseInt(req.params.id));
  res.status(204).send();
});

app.post("/movies/comments", async (req: Request, res: Response) => {
  const comment = await createComment(req.body);
  res.status(201).json(comment);
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
