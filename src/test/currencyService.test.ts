import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getUsdToInrRate } from '../lib/currencyService';

describe('currencyService', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
    localStorage.clear();
    vi.resetModules();
  });

  it('should fetch rate from API if cache is empty', async () => {
    const mockRate = 84.5;
    (fetch as any).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ price: mockRate.toString() }),
    });

    const rate = await getUsdToInrRate();
    expect(rate).toBe(mockRate);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('should use fallback if API fails and cache is empty', async () => {
    // Re-import to ensure clean module state
    const { getUsdToInrRate } = await import('../lib/currencyService');
    (fetch as any).mockRejectedValue(new Error('API Down'));

    const rate = await getUsdToInrRate();
    expect(rate).toBe(85.5); // Fallback
  });
});
