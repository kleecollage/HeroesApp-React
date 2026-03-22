import { getHeroesByPageAction } from "@/heroes/actions/get-heroes-by-page.action";
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { beforeEach, describe, expect, test, vi } from "vitest";


vi.mock('@/heroes/actions/get-heroes-by-page.action', () => ({
  getHeroesByPageAction: vi.fn()
}));

const mockGetHeroesByPageAction = vi.mocked(getHeroesByPageAction);

const queryClient= new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
});

const tanStackCustomProvider = () => {
  return ({children}: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
};

describe('usePaginatedHero', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    queryClient.clear();
  })


  test('should return the initial state (isLoading)', () => {
    const { result } = renderHook( () => usePaginatedHero({page: 1}), {
      wrapper: tanStackCustomProvider()
    });
    // console.log(result);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toBe(undefined);
    expect(result.current.data).toBeUndefined();
  });


  test('should return success state with data when API calls succeeds', async () => {
    const mockHeroesData = { total: 20, pages: 4, heroes: [] };
    mockGetHeroesByPageAction.mockResolvedValue(mockHeroesData)

    const { result } = renderHook( () => usePaginatedHero({page: 1}), {
      wrapper: tanStackCustomProvider()
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    })
    // console.log(result.current)

    expect(result.current.status).toBe('success');
    expect(mockGetHeroesByPageAction).toHaveBeenCalled();
    expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(1,6,'all');
  });


  test('should call getHeroesByPageActions with arguments', async () => {
    const mockHeroesData = { total: 20, pages: 4, heroes: [] };
    mockGetHeroesByPageAction.mockResolvedValue(mockHeroesData);

    const { result } = renderHook( () => usePaginatedHero({page: 1, limit: 6, category:'heroes'}), {
      wrapper: tanStackCustomProvider()
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    })
    // console.log(result.current)

    expect(result.current.status).toBe('success');
    expect(mockGetHeroesByPageAction).toHaveBeenCalled();
    expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(1,6,'heroes');
  });
})