import { getHero } from "@/heroes/actions/get-hero";
import { useQuery } from "@tanstack/react-query";

export const useHeroDetails = (idSlug: string) => {
  return useQuery({
    queryKey: ['hero-details', idSlug],
    queryFn: () => getHero(idSlug),
    staleTime: 1000 * 60 * 5, // 5 mins
  });
}
