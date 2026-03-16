import type { Hero } from "@/heroes/types/hero.interface";

export interface HeroResponse {
  total: number;
  pages: number;
  heroes: Hero[];
}