import { heroApi } from "@/heroes/api/hero.api";
import type { Hero } from "@/heroes/types/hero.interface";

export interface Option {
  name?: string;
  team?: string;
  category?: string;
  universe?: string;
  status?: string;
  strength?: string;
}

export const searchHeroesAction = async({name, team, category, universe, status, strength}: Option ) => {
  const BASE_URL = import.meta.env.VITE_API_URL;

  if (!name && !team && !category && !universe && !status && !strength) return [];
  if (name === '' && team === '' && category === '' && universe === '' && status === '' && strength === '') return [];

  const { data } = await heroApi.get<Hero[]>('/search', {
    params: {
      name: name,
      team: team,
      category: category,
      universe: universe,
      status: status,
      strength: strength,
    }
  });

  const heroes = data.map( hero => ({
      ...hero,
      image: `${BASE_URL}/images/${hero.image}`
    })
  );

  return heroes;
}