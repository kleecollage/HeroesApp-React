import { getHeroAction } from "@/heroes/actions/get-hero.action";
import { heroApi } from "@/heroes/api/hero.api";
import { beforeEach, describe, expect, test, vi } from "vitest";

vi.mock('@/heroes/api/hero.api', () => ({
  heroApi: {
    get: vi.fn()
  }
}))

const BASE_URL = 'http://localhost:3001'

describe('getHeroAction', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('should fetch hero data and return with complete image url', async () => {
    // arrange
    const mockHero = {
      id: 1,
      name: 'clark-kent',
      image: 'superman.jpg'
    };

    vi.mocked(heroApi.get).mockResolvedValue({data: mockHero});

    // act
    const result = await getHeroAction('clark-kent');

    // assert
    expect(heroApi.get).toHaveBeenCalledWith('/clark-kent');
    expect(result.image).toContain('http')
    expect(result.image).toContain('/images')
    expect(result).toEqual({
      hero: mockHero,
      image: `${BASE_URL}/images/superman.jpg`
    })
  });

  test('should throw an error if hero is not found', async () => {
    // arrange
    const idSlug = 'batman2';
    const axiosError = {
      message: 'Hero not found',
      error: "Not Found",
      statusCode: 404
    }

    vi.mocked(heroApi.get).mockRejectedValue(axiosError)

    // act
    const result = await getHeroAction(idSlug).catch((error) => {
      expect(error).toBeDefined();
      expect(error.message).toBe('Hero not found')
    });

    // assert
    expect(result).toBeUndefined();
  })
})