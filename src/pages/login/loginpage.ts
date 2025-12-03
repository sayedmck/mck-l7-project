import {Locator, Page, expect} from "@playwright/test";
import { decrypt } from "../../utils/CryptoUtil";
import { BasePage } from "../basepage";

export class LoginPage extends BasePage{

    private usernameInput : Locator;
    private passwordInput : Locator;
    private loginButton : Locator;;
    private flashMessage : Locator;;

    constructor(page: Page) {
    super(page)
    //this.page = page;
    this.usernameInput =  page.locator("#username");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator('button[type="submit"]');
    this.flashMessage = page.locator("#flash");
    }

    async goto() {
        await this.page.goto('/login');
    }

    async login(username: string, password: string) {
  
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(username);
  
        await this.loginButton.click();
    }

    async assertSuccess() {
        await expect(this.page.getByText('You logged into a secure area!')).toBeVisible();
    }

    async getErrorMessage() {
        return await this.flashMessage.textContent();
    }
}