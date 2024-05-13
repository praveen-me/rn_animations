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
  toggleLoading,
} from '@app/src/lib/MiniStore';

function useActions() {
  const {dispatch} = useMiniStore();

  async function getAndSetAllMovies() {
    try {
      toggleGlobalLoader();

      const allMovies = await getAllMovies();

      allMovies.length && dispatch(setMovies(allMovies));
    } catch (e) {
      throw new Error(e.message || 'Failed to fetch movies');
    } finally {
      toggleGlobalLoader();
    }
  }

  function toggleMovieFromFavorites(id: number) {
    dispatch(toggleFavouriteMovie(id));
  }

  async function getAndSetAllMoviesComments(movieId: number) {
    try {
      const comments: IComment[] = await getAllMovieComments(movieId);

      dispatch(setAllComments(comments, movieId));
    } catch (e) {}
  }

  async function addCommentToMovie(comment: string, movieId: number) {
    try {
      toggleGlobalLoader();
      await addMovieComment(movieId, comment);

      await getAndSetAllMoviesComments(movieId);
    } catch (e) {
    } finally {
      toggleGlobalLoader();
    }
  }

  async function deleteCommentFromMovie(commentId: number, movieId: number) {
    try {
      toggleGlobalLoader();
      await deleteMovieComment(movieId, commentId);

      await getAndSetAllMoviesComments(movieId);
    } catch (e) {
    } finally {
      toggleGlobalLoader();
    }
  }

  function toggleGlobalLoader() {
    dispatch(toggleLoading());
  }

  return {
    getAndSetAllMovies,
    toggleMovieFromFavorites: toggleMovieFromFavorites,
    getAndSetAllMoviesComments,
    addCommentToMovie,
    deleteCommentFromMovie,
    toggleGlobalLoader,
  };
}

export default useActions;
