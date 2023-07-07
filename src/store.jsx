import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

// Define initial state
const initialState = {
    records: [
      {
        id: '1',
        name: 'Wayne Rooney',
        company: 'DC United',
        status: 'Active',
        lastUpdated: '2023-07-07',
        notes: 'ManUtd Highest Scorer',
      },
      {
        id: '2',
        name: 'Ryan Giggs',
        company: 'Manchester United',
        status: 'Inactive',
        lastUpdated: '2023-07-07',
        notes: 'Most Matches Played',
      },
    ],
    filters: [],
  };

// Define action types
const ADD_RECORD = 'ADD_RECORD';
const DELETE_RECORD = 'DELETE_RECORD';
const ADD_FILTER = 'ADD_FILTER';
const REMOVE_FILTER = 'REMOVE_FILTER';

// Define action creators
export const addRecord = (record) => ({
  type: ADD_RECORD,
  payload: record,
});

export const deleteRecord = (recordId) => ({
  type: DELETE_RECORD,
  payload: recordId,
});

export const addFilter = (filter) => ({
  type: ADD_FILTER,
  payload: filter,
});

export const removeFilter = (filter) => ({
  type: REMOVE_FILTER,
  payload: filter,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RECORD:
      return {
        ...state,
        records: [...state.records, action.payload],
      };
    case DELETE_RECORD:
      return {
        ...state,
        records: state.records.filter((record) => record.id !== action.payload),
      };
    case ADD_FILTER:
      return {
        ...state,
        filters: [...state.filters, action.payload],
      };
    case REMOVE_FILTER:
      return {
        ...state,
        filters: state.filters.filter((filter) => filter !== action.payload),
      };
    default:
      return state;
  }
};

const store = configureStore({
  reducer,
  middleware: [thunk],
});

export default store;
