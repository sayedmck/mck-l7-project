import { test } from '@playwright/test';
import { DragDropPage } from '../../pages/dragdropPage';

test.describe('Drag and Drop Functionality', () => {

    test('Drag A → B and validate positions swapped', async ({ page }) => {
        const drag = new DragDropPage(page);

        await drag.goto();

        // Capture values before drag
        const beforeA = await drag.getBoxAText();
        const beforeB = await drag.getBoxBText();

        // Perform Drag A → B
        await drag.dragAtoB();

        // Now A should contain what B had earlier and vice versa
        await drag.assertPositions(beforeB, beforeA);
    });

    test('Drag B → A and validate positions swapped again', async ({ page }) => {
        const drag = new DragDropPage(page);

        await drag.goto();

        // Capture initial state
        const beforeA = await drag.getBoxAText();
        const beforeB = await drag.getBoxBText();

        // Drag B → A
        await drag.dragBtoA();

        // Validate swapped
        await drag.assertPositions(beforeB, beforeA);
    });

});
