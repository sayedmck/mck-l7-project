import { Page,  expect } from "@playwright/test";
import test from "../../fixtures/objectpage"

test.describe('Login Tests with Fixtures + Env Credentials', () => {

    test('Positive Login using env credentials', async ({ page, loginPage }) => {
        await page.goto('/login');
        await loginPage.login(process.env.USERNAME!, process.env.PASSWORD!);
        await loginPage.assertSuccess();
    });

    test('Negative Login - Wrong username', async ({ page, loginPage }) => {
        await page.goto('/login');
        await loginPage.login('wrongUser', process.env.PASSWORD!);

        const error = await loginPage.getErrorMessage();
        expect(error).toContain('Your password is invalid!');
    });

    test('Negative Login - Wrong password', async ({ page, loginPage }) => {
        await page.goto('/login');
        await loginPage.login(process.env.USERNAME!, 'WrongPassword');

        const error = await loginPage.getErrorMessage();
        expect(error).toContain('Your password is invalid!');
    });

});