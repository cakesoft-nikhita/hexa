import {
  DB_INITIALIZED,
  DB_FETCHED,
  DB_INSERTED,
  KEY_FETCHED,
  DB_FETCHEDSSS,
} from '../actions/storage';
import { Database } from '../../common/interfaces/Interfaces';

const initialState: {
  databaseInitialized: Boolean;
  insertedIntoDB: Boolean;
  key: String;
  database: Database;
  dbFetched: Boolean;
  databaseSSS: {};
} = {
  databaseInitialized: false,
  insertedIntoDB: false,
  key: '',
  database: { WALLET_SETUP: null, DECENTRALIZED_BACKUP: null },
  dbFetched: false,
  databaseSSS: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DB_INITIALIZED:
      return {
        ...state,
        databaseInitialized: action.payload.initialized,
      };

    case DB_FETCHED:
      const newState = {
        ...state,
        database: action.payload.database,
        insertedIntoDB: true,
        dbFetched: true,
      };
      return {
        ...newState,
      };

    case DB_INSERTED:
      const updatedState = {
        ...state,
        database: {
          ...state.database,
          ...action.payload.updatedEntity,
        },
        insertedIntoDB: true,
      };
      return {
        ...updatedState,
      };

    case KEY_FETCHED:
      return {
        ...state,
        key: action.payload.key,
      };
    case DB_FETCHEDSSS:
      const updatedSSSState = {
        ...state,
        databaseSSS: {
          ...action.payload.database,
        },
      };
      console.log({ updatedSSSState });
      return {
        ...updatedSSSState,
      };
  }
  return state;
};
