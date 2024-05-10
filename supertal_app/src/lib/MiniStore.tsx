import React, {createContext, useReducer, useContext, ReactNode} from 'react';
import {IAppState, IMovie} from '@app/src/@types/common';

// Define the initial state of the store
const initialState: IAppState = {
  movies: [],
  favouriteMovies: [],
};

interface ISetMovies {
  type: 'SET_MOVIES_LIST';
  payload: IMovie[];
}

interface ISetFavoruiteMovie {
  type: 'SET_FAVOURITE_MOVIE';
  payload: number;
}

// Define the reducer function to handle state updates
type Action = ISetMovies | ISetFavoruiteMovie;

export function setMovies(users: IMovie[]): ISetMovies {
  return {
    type: 'SET_MOVIES_LIST',
    payload: users,
  };
}

export function toggleFavouriteMovie(movieId: number): ISetFavoruiteMovie {
  return {
    type: 'SET_FAVOURITE_MOVIE',
    payload: movieId,
  };
}

const reducer = (state: IAppState, action: Action): IAppState => {
  switch (action.type) {
    case 'SET_MOVIES_LIST': {
      return {...state, movies: action.payload};
    }

    case 'SET_FAVOURITE_MOVIE': {
      const {payload} = action;
      const {favouriteMovies} = state;
      const index = favouriteMovies.indexOf(payload);
      let updatedFavouriteMovies = [];

      if (index === -1) {
        updatedFavouriteMovies = [...favouriteMovies, payload];
      } else {
        updatedFavouriteMovies = favouriteMovies.filter(id => id !== payload);
      }

      return {
        ...state,
        favouriteMovies: updatedFavouriteMovies,
      };
    }

    default:
      return state;
  }
};

// Create the context for the store
const MiniStoreContext = createContext<
  {state: IAppState; dispatch: React.Dispatch<Action>} | undefined
>(undefined);

interface MiniStoreProps {
  children: ReactNode;
}

const MiniStore: React.FC<MiniStoreProps> = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MiniStoreContext.Provider value={{state, dispatch}}>
      {children}
    </MiniStoreContext.Provider>
  );
};

const useMiniStore = () => {
  const context = useContext(MiniStoreContext);
  if (!context) {
    throw new Error('useMiniStore must be used within a MiniStoreProvider');
  }
  return context;
};

export {MiniStore, useMiniStore};
