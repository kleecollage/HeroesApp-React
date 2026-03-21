import { heroApi } from '@/heroes/api/hero.api';
import { describe, expect, test } from 'vitest';

const BASE_URL = import.meta.env.VITE_API_URL

describe('HeroApi', () => {
  test('should be configure pointing to testing server', () => {
    expect(heroApi).toBeDefined();
    expect(heroApi.defaults.baseURL).toBe(`${BASE_URL}/api/heroes`);
    expect(heroApi.defaults.baseURL).toContain('3001');
    console.log(heroApi.defaults.baseURL)
  })
})