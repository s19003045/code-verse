import { test, expect } from '@playwright/test';

test.describe('CodeVerse navigator', () => {
  test('loads landing UI', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /CodeVerse/i })).toBeVisible();
    await expect(page.getByPlaceholder('Search experiences...')).toBeVisible();
  });
});
