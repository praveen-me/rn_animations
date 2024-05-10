import {IState, IUser} from '@app/src/@types/common';
import React, {createContext, useReducer, useContext, ReactNode} from 'react';

// Define the initial state of the store
const initialState: IState = {
  movies: [],
  favourites: [],
};

interface ISetUsers {
  type: 'SET_USERS_LIST';
  payload: IUser[];
}

// Define the reducer function to handle state updates
type Action = {type: 'SET_USERS_LIST'; payload: IUser[]} | {type: 'DECREMENT'};

export function setUsers(users: IUser[]): ISetUsers {
  return {
    type: 'SET_USERS_LIST',
    payload: users,
  };
}

const reducer = (state: IState, action: Action): IState => {
  switch (action.type) {
    case 'SET_USERS_LIST':
      return {...state, users: action.payload};

    default:
      return state;
  }
};

// Create the context for the store
const MiniStoreContext = createContext<
  {state: IState; dispatch: React.Dispatch<Action>} | undefined
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
