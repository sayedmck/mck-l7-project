import { Page, Locator, expect } from '@playwright/test';

export class DragDropPage {

    private boxA: Locator;
    private boxB: Locator;
    private headerA: Locator;
    private headerB: Locator;

    constructor(private page: Page) {
        this.boxA = page.locator('#column-a');
        this.boxB = page.locator('#column-b');
        this.headerA = page.locator('#column-a header');
        this.headerB = page.locator('#column-b header');
    }

    async goto() {
        await this.page.goto('/drag-and-drop');
    }

    async dragAtoB() {
        await this.boxA.dragTo(this.boxB);
    }

    async dragBtoA() {
        await this.boxB.dragTo(this.boxA);
    }

    async getBoxAText(): Promise<string> {
        return await this.headerA.textContent() || "";
    }

    async getBoxBText(): Promise<string> {
        return await this.headerB.textContent() || "";
    }

    async assertPositions(expectedA: string, expectedB: string) {
        const textA = await this.getBoxAText();
        const textB = await this.getBoxBText();

        expect(textA).toBe(expectedA);
        expect(textB).toBe(expectedB);
    }
}
