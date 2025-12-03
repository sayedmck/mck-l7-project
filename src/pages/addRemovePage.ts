import { expect, Page, Locator } from '@playwright/test';

export class AddRemovePage {

    private addButton: Locator;
    private deleteButtons: Locator;

    constructor(private page: Page) {
        this.addButton = page.locator('button[onclick="addElement()"]');
        this.deleteButtons = page.locator('button.added-manually');
    }

    async goto() {
        await this.page.goto('/add-remove-elements');
    }

    async addElements(count: number) {
        for (let i = 0; i < count; i++) {
            await this.addButton.click();
        }
    }

    async deleteElement(index: number) {
        await this.deleteButtons.nth(index).click();
    }

    async deleteAll() {
        const btnCount = await this.deleteButtons.count();
        for (let i = 0; i < btnCount; i++) {
            await this.deleteButtons.nth(0).click(); // always delete the first remaining
        }
    }

    async getDeleteButtonsCount(): Promise<number> {
        return await this.deleteButtons.count();
    }

    async assertDeleteButtonsCount(expected: number) {
        await expect(this.deleteButtons).toHaveCount(expected);
    }
}
