import { test, expect } from '@playwright/test'

test('Snapshot index page', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveScreenshot({ fullPage: true })
})

test('Should navigate to the "Example for Markdown" page', async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('/')
  // Find an element with the text 'Example for Markdown' and click on it
  await page.getByText('Example for Markdown').click()
  // The new url should be "/blog/sample-markdown-post" (baseURL is used there)
  await expect(page).toHaveURL('/blog/sample-markdown-post')
  // The new page should contain an h1 with "Example for Markdown"
  await expect(page.getByRole('heading', { name: 'Example for Markdown', level: 1 })).toBeVisible()
})

test('Should navigate to the "About" page', async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('/')
  // Find an element with the text 'About' and click on it
  await page.getByText('About').click()
  // The new url should be "/blog/sample-markdown-post" (baseURL is used there)
  await expect(page).toHaveURL('/about')
  // The new page should contain an h1 with "About"
  await expect(page.getByRole('heading', { name: 'About', level: 1 })).toBeVisible()
})
