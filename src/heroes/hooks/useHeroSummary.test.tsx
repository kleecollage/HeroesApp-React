import { getSumamryAction } from "@/heroes/actions/get-summary.action";
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary";
import type { SummaryInformationResponse } from "@/heroes/types/summary-information.response";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { describe, expect, test, vi } from "vitest";

vi.mock('@/heroes/actions/get-summary.action', () => ({
  getSumamryAction: vi.fn(),
}));

const mockGetSummaryAction = vi.mocked(getSumamryAction);

const tanStackCustomProvider = () => {
  const queryClient= new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  });

  return ({children}: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
};

describe('useHeroSummary', () => {
  test('should return the initial state (isLoading)', () => {
    mockGetSummaryAction.mockReturnValue(new Promise(() => {}));

    const { result } = renderHook( () => useHeroSummary(), {
      wrapper: tanStackCustomProvider()
    });
    // console.log(result);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toBe(undefined);
    expect(result.current.data).toBeUndefined();
  });


  test('should return success state with data when API call succeeds', async () => {
    const mockSummaryData = {
      totalHeroes: 10,
      strongestHero: {
        id: '1',
        alias: 'Superman'
      },
      smartestHero: {
        id: '2',
        alias: 'Batman'
      },
      heroCount: 18,
      villainCount: 7
    } as SummaryInformationResponse;

    mockGetSummaryAction.mockResolvedValue(mockSummaryData);

    const { result } = renderHook( () => useHeroSummary(), {
      wrapper: tanStackCustomProvider()
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });
    // console.log(result.current);

    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.isError).toBeFalsy();
    expect(mockGetSummaryAction).toHaveBeenCalled();
  });


  test('should return error state when API call fails', async () => {
    const mockError = new Error('Failed to fetch summary');
    mockGetSummaryAction.mockRejectedValue(mockError);

    const { result } = renderHook( () => useHeroSummary(), {
      wrapper: tanStackCustomProvider()
    });

    await waitFor(() => {
      expect(result.current.isError).toBeTruthy();
    });
    // console.log(result);
    expect(result.current.error).toBeDefined();
    expect(result.current.isLoading).toBeFalsy();
    expect(mockGetSummaryAction).toHaveBeenCalled();
    expect(result.current.error?.message).toBe('Failed to fetch summary');

  })
})