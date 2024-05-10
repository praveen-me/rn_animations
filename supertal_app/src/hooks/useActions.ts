import {getAllMovies} from '@app/src/api';
import {
  setMovies,
  useMiniStore,
  toggleFavouriteMovie,
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

  return {
    getAndSetAllMovies,
    toggleMovieFromFavorites: toggleMovieFromFavorites,
  };
}

export default useActions;
