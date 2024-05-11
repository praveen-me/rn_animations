import {IComment} from '@app/src/@types/common';
import {
  addMovieComment,
  deleteMovieComment,
  getAllMovieComments,
  getAllMovies,
} from '@app/src/api';
import {
  setMovies,
  useMiniStore,
  toggleFavouriteMovie,
  setAllComments,
} from '@app/src/lib/MiniStore';

function useActions() {
  const {dispatch} = useMiniStore();

  async function getAndSetAllMovies() {
    try {
      const allMovies = await getAllMovies();

      allMovies.length && dispatch(setMovies(allMovies));
    } catch (e) {}
  }

  function toggleMovieFromFavorites(id: number) {
    dispatch(toggleFavouriteMovie(id));
  }

  async function getAndSetAllMoviesComments(movieId: number) {
    // Fetch all movies from the API
    // and set them in the store

    try {
      const comments: IComment[] = await getAllMovieComments(movieId);

      dispatch(setAllComments(comments, movieId));
    } catch (e) {}
  }

  async function addCommentToMovie(comment: string, movieId: number) {
    try {
      await addMovieComment(movieId, comment);

      await getAndSetAllMoviesComments(movieId);
    } catch (e) {}
  }

  async function deleteCommentFromMovie(commentId: number, movieId: number) {
    try {
      await deleteMovieComment(movieId, commentId);

      await getAndSetAllMoviesComments(movieId);
    } catch (e) {}
  }

  return {
    getAndSetAllMovies,
    toggleMovieFromFavorites: toggleMovieFromFavorites,
    getAndSetAllMoviesComments,
    addCommentToMovie,
    deleteCommentFromMovie,
  };
}

export default useActions;
