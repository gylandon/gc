import apis from '../collection';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { COLLECTION } from './test-data';
import endpoints from '@endPoints';

describe('Collection Apis', () => {
  let mock;
  const collectionData = COLLECTION.COLLECTION_DATA;
  const collectionsData = COLLECTION.COLLECTIONS_DATA;
  const newCollectionData = COLLECTION.NEW_COLLECTION_DATA;

  global.FormData = () => {
    return { append: jest.fn() };
  };

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  it('can get a collection', (done) => {
    const dataId = 1;
    mock
      .onGet(`${endpoints.GET_COLLECTION}/${dataId}`)
      .reply(200, collectionData);
    apis
      .getCollection(dataId)
      .then((response) => {
        expect(mock.history.get.length).toEqual(1);
        const request = mock.history.get[0];
        expect(request.url).toEqual(`${endpoints.GET_COLLECTION}/${dataId}`);
        expect(response.status === 200);
        expect(response.data).toEqual(collectionData);
        done();
      })
      .catch((error) => {
        throw new Error(error);
      });
  });

  it('can get collections', (done) => {
    mock.onGet(endpoints.GET_COLLECTIONS).reply(200, collectionsData);
    apis
      .getCollections()
      .then((response) => {
        expect(mock.history.get.length).toEqual(1);
        const request = mock.history.get[0];
        expect(request.url).toEqual(endpoints.GET_COLLECTIONS);
        expect(response.status === 200);
        expect(response.data).toEqual(collectionsData);
        done();
      })
      .catch((error) => {
        throw new Error(error);
      });
  });

  it('can create a collection', (done) => {
    const expectedResponse = { dataId: 1 };
    mock.onPost(endpoints.CREATE_COLLECTION).reply(200, expectedResponse);
    apis
      .createCollection(newCollectionData)
      .then((response) => {
        expect(mock.history.post.length).toEqual(1);
        const request = mock.history.post[0];
        expect(request.url).toEqual(endpoints.CREATE_COLLECTION);
        expect(response.status === 200);
        expect(response.data).toEqual(expectedResponse);
        done();
      })
      .catch((error) => {
        throw new Error(error);
      });
  });
});
