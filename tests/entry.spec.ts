import { test/* , expect  */ } from '@playwright/test';

const URL = process.env.BASE_URL || "";
const EMAIL = process.env.TEST_EMAIL || "";
const PASSWORD = process.env.TEST_PASSWORD || "";
const NAME = process.env.TEST_NAME || "";

test('login', async ({ page }) => {
  await page.goto(URL);
  await page.getByRole('link', { name: 'Sign In' }).click();
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill(EMAIL);
  await page.getByLabel('Email').press('Tab');
  await page.getByLabel('Password').fill(PASSWORD);
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('button', { name: EMAIL }).click();
  await page.goto(URL + "profile");
  await page.getByLabel('Name').click();
  await page.getByLabel('Name').fill(NAME);
  await page.getByLabel('Name').press('Tab');
  await page.getByLabel('Email *').press('Tab');
  await page.getByRole('button').nth(1).press('Tab');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('main').click();
  await page.getByRole('button', { name: EMAIL }).click();
  await page.getByRole('link', { name: 'Sign out' }).click();
});
