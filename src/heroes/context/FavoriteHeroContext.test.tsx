import { FavoriteHeroContext, FavoriteHeroProvider } from "@/heroes/context/FavoriteHeroContext";
import type { Hero } from "@/heroes/types/hero.interface";
import { fireEvent, render, screen } from "@testing-library/react";
import { use } from "react";
import { beforeEach, describe, expect, test } from "vitest";

const mockHero = {
  id: '1',
  name: 'batman'
} as Hero

const TestComponent = () => {
  const { favoriteCount, favorites, isFavorite, toggleFavorite } = use(FavoriteHeroContext)

  return (
  <div>
    <div data-testid="favorite-count">{favoriteCount}</div>
    <div data-testid="favorite-list">
      {
        favorites.map(hero => (
          <div key={hero.id} data-testid={`hero-${hero.id}`}>{hero.name}</div>
        ))
      }
    </div>

    <button data-testid="toggle-favorite" onClick={() => toggleFavorite(mockHero)}>
      Toggle Favorite
    </button>
    <div data-testid='is-favorite'>
      { isFavorite(mockHero).toString() }
    </div>
  </div>
  );
};

const renderConextTest = () => {
  return render(
    <FavoriteHeroProvider>
      <TestComponent />
    </FavoriteHeroProvider>
  )
}

describe('FavoriteHeroContext', () => {
  beforeEach(() => {
    localStorage.clear();
  })

  test('should initialize with default values', () => {
    renderConextTest();
    screen.debug()
    expect(screen.getByTestId('favorite-count').textContent).toBe('0')
    expect(screen.getByTestId('favorite-count').children).toHaveLength(0)
  })

  test('should add hero to favorites when toggleFavorite is called with new hero', () => {
    renderConextTest();
    const button = screen.getByTestId('toggle-favorite');
    fireEvent.click(button);
    // localStorage.clear()
    screen.debug()

    expect(screen.getByTestId('is-favorite').textContent).toBe('true')
    expect(screen.getByTestId('hero-1').textContent).toBe('batman')
    expect(localStorage.getItem('favorites')).toBe('[{"id":"1","name":"batman"}]')
  })

  test('should remove hero from favorites when toggleFavorite is called', () => {
    console.log(localStorage.getItem('favorites'))
    localStorage.setItem('favorites', JSON.stringify([mockHero]));

    renderConextTest();
    const button = screen.getByTestId('toggle-favorite');
    fireEvent.click(button);
    screen.debug()

    expect(screen.getByTestId('is-favorite').textContent).toBe('false')
    expect(screen.queryByTestId('hero-1')).toBeNull()
  })
})