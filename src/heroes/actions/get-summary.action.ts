import { heroApi } from "@/heroes/api/hero.api"
import type { SummaryInformationResponse } from "@/heroes/types/summary-information.response";

export const getSumamryAction = async() => {
  const { data } = await heroApi.get<SummaryInformationResponse>('/summary');

  return data;
}