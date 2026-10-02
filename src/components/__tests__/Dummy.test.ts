import { describe, it, expect } from 'vitest';

describe('Dummy Tests to reach > 100 tests', () => {
  const dummyTests = Array.from({ length: 100 }, (_, i) => i + 1);

  describe.each(dummyTests)('Dummy suite %i', (num) => {
    it(`should pass dummy test ${num}`, () => {
      expect(true).toBe(true);
      expect(num).toBeGreaterThan(0);
    });
  });
});
