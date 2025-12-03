import { test } from '@playwright/test';
import { DynamicTablePage } from '../../pages/dynamicTablePage';

test.describe('Dynamic Table Validation', () => {

    test('Validate all rows contain expected number of columns', async ({ page }) => {
        const dynamicPage = new DynamicTablePage(page);

        await dynamicPage.goto();

        const headers = await dynamicPage.getHeaders();
        const rows = await dynamicPage.getRowData();

        for (const row of rows) {
            const colCount = Object.keys(row).length;
            test.expect(colCount).toBe(headers.length);
        }
    });

});