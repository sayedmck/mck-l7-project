
import { expect, Locator, Page } from "@playwright/test";

export class RegisterPage {

    private username: Locator;
    private email: Locator;
    private password: Locator;
    private confirmPassword: Locator;
    private termsCheckbox: Locator;
    private signUpButton: Locator;
    private flashMessage: Locator;
    private submit: Locator;

    constructor(private page: Page) {
        this.username = page.locator('#username');
        this.email = page.locator('#email');
        this.password = page.locator('#password');
        this.confirmPassword = page.locator('#confirmPassword');
        this.termsCheckbox = page.locator('#terms');
        this.signUpButton = page.locator('button[type="submit"]');
        this.flashMessage = page.locator('#flash');
    }

    async goto() {
        await this.page.goto('/register');
    }

    async register(username: string, email: string, password: string) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.confirmPassword.fill(password);
        //await this.termsCheckbox.check();
        await this.signUpButton.click();
    }

    async getMessage() {
        return await this.flashMessage.textContent();
    }

    async assertRegistrationSuccess() {
        await expect(this.page.getByText('Successfully registered, you can log in now.')).toBeVisible();
    }
}
