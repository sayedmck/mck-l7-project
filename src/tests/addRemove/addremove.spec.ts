import { test } from '@playwright/test';
import { AddRemovePage } from '../../pages/addRemovePage';

test.describe('Add/Remove Elements Automation', () => {

    test('Add multiple elements and validate count', async ({ page }) => {
        const addRemove = new AddRemovePage(page);

        await addRemove.goto();
        await addRemove.addElements(5);

        await addRemove.assertDeleteButtonsCount(5);
    });

    test('Remove specific element and validate count update', async ({ page }) => {
        const addRemove = new AddRemovePage(page);

        await addRemove.goto();
        await addRemove.addElements(4);

        // remove the 3rd element (index 2)
        await addRemove.deleteElement(2);

        await addRemove.assertDeleteButtonsCount(3);
    });

    test('Remove all elements and verify page contains none', async ({ page }) => {
        const addRemove = new AddRemovePage(page);

        await addRemove.goto();
        await addRemove.addElements(3);

        await addRemove.deleteAll();
        await addRemove.assertDeleteButtonsCount(0);
    });

});
