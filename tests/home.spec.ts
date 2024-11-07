import { test, expect } from '@playwright/test';

test('should navigate from home to login page', async ({ page }) => {
  // Go to the home page
  await page.goto('/');

  // Find and click the login link
  await page.click('text=Log in');

  // Verify we're on the login page
  await expect(page).toHaveURL('/login');
});