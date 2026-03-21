import { getHeroesByPageAction } from "@/heroes/actions/get-heroes-by-page.action";
import { beforeEach, describe, expect, test } from "vitest";
import AxiosMockAdapter from 'axios-mock-adapter'
import { heroApi } from "@/heroes/api/hero.api";

const BASE_URL = import.meta.env.VITE_API_URL;

describe('getHeroesByPageAction', () => {
  const heroesApiMock = new AxiosMockAdapter(heroApi);
  beforeEach(() => {
    heroesApiMock.reset();
    heroesApiMock.resetHistory();
  })

  
  test('should return default heroes', async () => {
    heroesApiMock.onGet('/').reply(200, {
      total: 10,
      pages: 2,
      heroes: [
        { image: '1.jpg' },
        { image: '2.jpg' },
      ]
    });

    const response = await getHeroesByPageAction(1);
    // console.log(response);

    expect(response).toStrictEqual({
      total: 10,
      pages: 2,
      heroes: [
        { image: `${BASE_URL}/images/1.jpg` },
        { image: `${BASE_URL}/images/2.jpg` }
      ]
    });
  });


  test('should return the correct hero when page is not a number', async () => {
    const responseObject = {
      total: 10,
      pages: 1,
      heroes: []
    };

    heroesApiMock.onGet('/').reply(200, responseObject);

    await getHeroesByPageAction('abc' as unknown as number);
    const params = heroesApiMock.history.get[0].params;
    console.log(params);

    expect(params).toStrictEqual({ category: 'all', limit: 6, offset: 0 });
  });


  test('should return the correct hero when page is a string number', async () => {
    const responseObject = {
      total: 10,
      pages: 1,
      heroes: []
    };

    heroesApiMock.onGet('/').reply(200, responseObject);

    await getHeroesByPageAction('5' as unknown as number);
    const params = heroesApiMock.history.get[0].params;
    console.log(params);

    expect(params).toStrictEqual({ category: 'all', limit: 6, offset: 24 });
  });


  test('should call the api with correctr params', async () => {
    const responseObject = {
      total: 10,
      pages: 1,
      heroes: []
    };

    heroesApiMock.onGet('/').reply(200, responseObject);

    await getHeroesByPageAction(2, 10, 'heroes');
    const params = heroesApiMock.history.get[0].params;
    console.log(params);

    expect(params).toStrictEqual({ category: 'heroes', limit: 10, offset: 10});
  });
})