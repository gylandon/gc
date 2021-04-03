import configureStore from 'redux-mock-store';
import reduxPromise from 'redux-promise-middleware';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { COLLECTION } from './test-data';
import endpoints from '@endPoints';
import actions from '@actions/collection';
import { COLLECTION as types } from '@types';

describe('Collection actions', () => {
  const middleware = [reduxPromise];
  const mockStore = configureStore(middleware);
  const collectionData = COLLECTION.COLLECTION_DATA;
  const collectionsData = COLLECTION.COLLECTIONS_DATA;
  const newCollectionData = COLLECTION.NEW_COLLECTION_DATA;

  global.FormData = () => {
    return { append: jest.fn() };
  };

  let mock;
  let store;

  describe('getCollection', () => {
    beforeEach(() => {
      mock = new MockAdapter(axios);
      store = mockStore();
    });

    const dataId = 1;

    it('can handle success scenario correctly', (done) => {
      mock
        .onGet(`${endpoints.GET_COLLECTION}/${dataId}`)
        .reply(200, collectionData);
      store.dispatch(actions.getCollection(dataId)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.GET_COLLECTION_PENDING);
        expect(actions[1].type).toEqual(types.GET_COLLECTION_FULFILLED);
        expect(actions[1].payload.data).toEqual(collectionData);
        done();
      });
    });

    it('can handle failure scenario correctly', (done) => {
      mock.onGet(`${endpoints.GET_COLLECTION}/${dataId}`).reply(404);
      store.dispatch(actions.getCollection(dataId)).catch(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.GET_COLLECTION_PENDING);
        expect(actions[1].type).toEqual(types.GET_COLLECTION_REJECTED);
        expect(actions[1].error).toBeTruthy();
        done();
      });
    });
  });

  describe('getCollections', () => {
    beforeEach(() => {
      mock = new MockAdapter(axios);
      store = mockStore();
    });

    it('can handle success scenario correctly', (done) => {
      mock.onGet(endpoints.GET_COLLECTIONS).reply(200, collectionsData);
      store.dispatch(actions.getCollections()).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.GET_COLLECTIONS_PENDING);
        expect(actions[1].type).toEqual(types.GET_COLLECTIONS_FULFILLED);
        expect(actions[1].payload.data).toEqual(collectionsData);
        done();
      });
    });

    it('can handle failure scenario correctly', (done) => {
      mock.onGet(endpoints.GET_COLLECTIONS).reply(404);
      store.dispatch(actions.getCollections()).catch(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.GET_COLLECTIONS_PENDING);
        expect(actions[1].type).toEqual(types.GET_COLLECTIONS_REJECTED);
        expect(actions[1].error).toBeTruthy();
        done();
      });
    });
  });

  describe('createCollection', () => {
    beforeEach(() => {
      mock = new MockAdapter(axios);
      store = mockStore();
    });

    it('can handle success scenario correctly', (done) => {
      mock.onPost(endpoints.CREATE_COLLECTION).reply(200, 1);
      store.dispatch(actions.createCollection(newCollectionData)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.CREATE_COLLECTION_PENDING);
        expect(actions[1].type).toEqual(types.CREATE_COLLECTION_FULFILLED);
        expect(actions[1].payload.data).toEqual(1);
        done();
      });
    });

    it('can handle failure scenario correctly', (done) => {
      mock.onPost(endpoints.CREATE_COLLECTION).reply(404);
      store.dispatch(actions.createCollection(newCollectionData)).catch(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.CREATE_COLLECTION_PENDING);
        expect(actions[1].type).toEqual(types.CREATE_COLLECTION_REJECTED);
        expect(actions[1].error).toBeTruthy();
        done();
      });
    });
  });
});
