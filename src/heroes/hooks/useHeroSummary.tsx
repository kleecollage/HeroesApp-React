import { getSumamryAction } from "@/heroes/actions/get-summary.action";
import { useQuery } from "@tanstack/react-query";

export const useHeroSummary = () => {
  return useQuery({
    queryKey: ['summary-information'],
    queryFn: getSumamryAction,
    staleTime: 1000 * 60 * 5, // 5 mins
  });
}
