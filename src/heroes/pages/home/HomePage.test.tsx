import { FavoriteHeroProvider } from "@/heroes/context/FavoriteHeroContext";
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero";
import { HomePage } from "@/heroes/pages/home/HomePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, test, vi } from "vitest";

vi.mock('@/heroes/hooks/usePaginatedHero');
const mockUsePaginatedHero = vi.mocked(usePaginatedHero);
mockUsePaginatedHero.mockReturnValue({
  data: { heroes: [], pages: 1 },
  isLoading: false,
  isError: false,
  isSuccess: true
} as unknown as ReturnType<typeof usePaginatedHero>);

const queryClient = new QueryClient();
const renderHomePage= (initialEntries: string[] = ['/']) => {
  return render (
    <MemoryRouter initialEntries={initialEntries}>
      <FavoriteHeroProvider>
        <QueryClientProvider client={queryClient}>
          <HomePage />
        </QueryClientProvider>
      </FavoriteHeroProvider>
    </MemoryRouter>
  )
}


describe('Home Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  })

  test('should render HomePage with default values', () => {
    const { container } = renderHomePage();
    // screen.debug();
    expect(container).toMatchSnapshot();
  });


  test('should call usePaginatedHero with default values', () => {
    renderHomePage();
    expect(mockUsePaginatedHero).toHaveBeenCalledWith({page: 1, limit: 6, category: 'all'});
  });


  test('should call usePaginatedHero with custom query params', () => {
    renderHomePage(['/?page=2&limit=10&category=villians']);
    expect(mockUsePaginatedHero).toHaveBeenCalledWith({category: 'villians', limit: 10, page: 2});
  });


  test('should called usePaginatedHero with default page and same limit on tab click', () => {
    renderHomePage(['/?tab=favorites&page=2&limit=10']);
    // const [allTabs, favoriteTab, heroesTab, villiansTab] = screen.getAllByRole('tab');
    const [, , ,villainsTab] = screen.getAllByRole('tab');
    // screen.debug(villainsTab);
    fireEvent.click(villainsTab);

    expect(mockUsePaginatedHero).toHaveBeenCalledWith({page: 1, limit: 10, category: 'villain'});
  });
})