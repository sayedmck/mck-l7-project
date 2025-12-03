import { Page, Locator, expect } from '@playwright/test';

export class DynamicTablePage {

    private table: Locator;
    private rows: Locator;
    private headers: Locator;
    private chromeCPULabel: Locator;

    constructor(private page: Page) {
        this.table = page.locator('.table');
        this.rows = page.locator('.table tbody tr');
        this.headers = page.locator('.table thead th');
        this.chromeCPULabel = page.locator('#chrome-cpu');
    }

    async goto() {
        await this.page.goto('/dynamic-table');
    }

    async getHeaders(): Promise<string[]> {
        return await this.headers.allTextContents();
    }

    async getRowData(): Promise<Record<string, string>[]> {
        const headers = await this.getHeaders();
        const rowLocators = await this.rows.all();

        const data: Record<string, string>[] = [];

        for (const row of rowLocators) {
            const cells = await row.locator('td').allTextContents();

            const rowObj: Record<string, string> = {};
            headers.forEach((header, i) => {
                rowObj[header] = cells[i] || "";
            });

            data.push(rowObj);
        }

        return data;
    }

}
