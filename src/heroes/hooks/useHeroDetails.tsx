import { getHeroAction } from "@/heroes/actions/get-hero.action";
import { useQuery } from "@tanstack/react-query";

export const useHeroDetails = (idSlug: string) => {
  return useQuery({
    queryKey: ['hero-details', idSlug],
    queryFn: () => getHeroAction(idSlug),
    staleTime: 1000 * 60 * 5, // 5 mins
    retry: false
  });
}
