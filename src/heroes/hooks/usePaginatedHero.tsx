import { getHeroesByPageAction } from "@/heroes/actions/get-heroes-by-page.action";
import { useQuery } from "@tanstack/react-query";

interface Props {
  page: number;
  limit?: number;
  category?: string
}

export const usePaginatedHero = ( {page, limit = 6, category = 'all'}: Props ) => {
  return useQuery({
    queryKey: ['heroes', { page, limit, category}],
    queryFn: () => getHeroesByPageAction(+page, +limit, category),
    staleTime: 1000 * 60 * 5 // 5 mins
  });
}
