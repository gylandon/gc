import { COLLECTION as types } from '@types';
import {
  INITIAL_STATE,
  CollectionReducer as reducer,
} from '@reducers/collection';

describe('Collection reducer', () => {
  const data = [];
  const payload = { data: { data: data } };

  describe('getCollection', () => {
    const payload = { data: data };

    it('can change status when pending', () => {
      const initialState = { ...INITIAL_STATE };
      const action = {
        type: types.GET_COLLECTION_PENDING,
      };
      const newState = reducer(initialState, action);
      expect(newState.currentCollection.isPending).toBeTruthy();
      expect(newState.currentCollection.error).toBeNull();
    });

    it('can successfully finish', () => {
      const initialState = { ...INITIAL_STATE };
      const action = {
        type: types.GET_COLLECTION_FULFILLED,
        payload: payload,
      };
      const newState = reducer(initialState, action);
      expect(newState.currentCollection.isPending).toBeFalsy();
      expect(newState.currentCollection.error).toBeNull();
      expect(newState.currentCollection.data).toEqual(data);
    });

    it('can record error', () => {
      const initialState = { ...INITIAL_STATE };
      const action = {
        type: types.GET_COLLECTION_REJECTED,
      };
      const newState = reducer(initialState, action);
      expect(newState.currentCollection.isPending).toBeFalsy();
      expect(newState.currentCollection.error).not.toBeNull();
    });

    it('can reset', () => {
      const initialState = { ...INITIAL_STATE };
      const action = {
        type: types.RESET_COLLECTION,
      };
      const newState = reducer(initialState, action);
      expect(newState.currentCollection.isPending).toBeFalsy();
      expect(newState.currentCollection.error).toBeNull();
      expect(newState.currentCollection.data).toBeNull();
    });
  });

  describe('getCollections', () => {
    it('can change status when pending', () => {
      const initialState = { ...INITIAL_STATE };
      const action = {
        type: types.GET_COLLECTIONS_PENDING,
      };
      const newState = reducer(initialState, action);
      expect(newState.collections.isPending).toBeTruthy();
      expect(newState.collections.error).toBeNull();
    });

    it('can successfully finish', () => {
      const initialState = { ...INITIAL_STATE };
      const action = {
        type: types.GET_COLLECTIONS_FULFILLED,
        payload: payload,
      };
      const newState = reducer(initialState, action);
      expect(newState.collections.isPending).toBeFalsy();
      expect(newState.collections.error).toBeNull();
      expect(newState.collections.data).toEqual(data);
    });

    it('can record error', () => {
      const initialState = { ...INITIAL_STATE };
      const action = {
        type: types.GET_COLLECTIONS_REJECTED,
      };
      const newState = reducer(initialState, action);
      expect(newState.collections.isPending).toBeFalsy();
      expect(newState.collections.error).not.toBeNull();
    });
  });
});
