import {getAllMovies} from '@app/src/api';
import {setMovies, useMiniStore} from '@app/src/lib/MiniStore';

function useActions() {
  const {dispatch} = useMiniStore();

  async function getAndSetAllMovies() {
    try {
      const allMovies = await getAllMovies();

      allMovies.length && dispatch(setMovies(allMovies));
    } catch (e) {}
  }

  return {
    getAndSetAllMovies,
  };
}

export default useActions;
