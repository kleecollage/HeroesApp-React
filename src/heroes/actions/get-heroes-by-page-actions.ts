import { heroApi } from "@/heroes/api/hero.api"
import type { HeroResponse } from "@/heroes/types/get-heroes.response";

export const getHeroesByPageAction = async(): Promise<HeroResponse> => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const { data } = await heroApi.get<HeroResponse>('/');

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