import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../pages/registerpage';
import { DataGenerator } from '../../utils/DataGenerator';

test.describe('User Registration Scenarios', () => {

    test('Positive Test - Register new user with dynamic data', async ({ page }) => {
        const registerPage = new RegisterPage(page);

        const username = DataGenerator.randomName();
        const email = DataGenerator.randomEmail();
        const password = DataGenerator.randomPassword();

        await registerPage.goto();
        await registerPage.register(username, email, password);

        await registerPage.assertRegistrationSuccess();
    });

    test('Negative Test - Duplicate Email & Username', async ({ page }) => {
        const registerPage = new RegisterPage(page);

        const username = "existinguser";
        const email = "existing@user.com";
        const password = "Pass@12345";

        await registerPage.goto();
        await registerPage.register(username, email, password);

        const msg = await registerPage.getMessage();
        expect(msg).toContain('User already exists');
    });

    test('Negative Test - Password mismatch', async ({ page }) => {
        const registerPage = new RegisterPage(page);

        await registerPage.goto();

        await page.fill('#username', DataGenerator.randomName());
        //await page.fill('#email', DataGenerator.randomEmail());
        await page.fill('#password', 'Pass@123');
        await page.fill('#confirmPassword', 'WrongPassword');
        //await page.check('#terms');
        await page.click('button[type="submit"]');

        const msg = await registerPage.getMessage();
        expect(msg).toContain('Passwords do not match');
    });

});
