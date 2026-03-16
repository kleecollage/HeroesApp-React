import { heroApi } from "@/heroes/api/hero.api"
import type { HeroResponse } from "@/heroes/types/get-heroes.response";

export const getHeroesByPageAction = async (
  page: number,
  limit: number = 6,
  category: string= 'all'
): Promise<HeroResponse> => {
  if (isNaN(page)) page = 1;
  if (isNaN(limit)) limit = 6;

  const BASE_URL = import.meta.env.VITE_API_URL;
  const { data } = await heroApi.get<HeroResponse>('/', {
    params: {
      limit: limit,
      offset: limit * (page - 1),
      category: category
    }
  });

  const heroes = data.heroes.map( hero => ({
      ...hero,
      image: `${BASE_URL}/images/${hero.image}`
    })
  );

  return {
    ...data,
    heroes
  };
}