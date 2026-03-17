import { searchHeroesAction, type Option } from "@/heroes/actions/search-heroes.action";
import { useQuery } from "@tanstack/react-query";

export const useSearchHeroes = ( params: Option ) => {
  return useQuery({
    queryKey: ['search-heroes', params],
    queryFn: () => searchHeroesAction(params),
    staleTime: 1000 * 60 * 5, // 5 mins
    retry: false
  });
}
