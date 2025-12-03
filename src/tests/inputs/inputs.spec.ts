//import { test } from "@playwright/test";
import test from "../../fixtures/objectpage"
import { InputsPage } from "../../pages/InputPage";
import testData from '../../testdata/inpuData.json';


test.describe("Inputs Page - POM Test Suite", () => {

  test.beforeEach(async ({ page }) => {
    //await inputPage.navigate();

  });

  // TEXT FIELD
  test("Validate text input", async ({ page, inputPage }) => {

    await page.goto('/inputs');
    await inputPage.enterText(testData.textData.valid);
    await inputPage.validateText(testData.textData.valid);

    await inputPage.enterText(testData.textData.invalid);
    await inputPage.validateText(testData.textData.invalid);

    await inputPage.enterText(testData.textData.empty);
    await inputPage.validateText(testData.textData.empty);
  });

  // NUMBER FIELD
  test("Validate number input", async ({ page, inputPage }) => {

    await page.goto('/inputs');
    await inputPage.enterNumber(testData.numberData.valid);
    await inputPage.validateNumber(testData.numberData.valid);

    await inputPage.enterNumber(testData.numberData.negative);
    await inputPage.validateNumber(testData.numberData.negative);
  });

  //DROPDOWN
  test("Validate dropdown", async ({ page, inputPage }) => {

    await page.goto('/dropdown');
    await inputPage.selectDropdown(testData.dropdownData.valid);
    await inputPage.validateDropdown(testData.dropdownData.validval);

    // invalid selection (should be ignored)
    const currentValue = testData.dropdownData.validval;
    await inputPage.selectDropdown(testData.dropdownData.invalid).catch(() => { });
    await inputPage.validateDropdown(currentValue);
  });

  //CHECKBOX
  test("Validate checkbox", async ({ page, inputPage }) => {
    await page.goto('/checkboxes');

    await inputPage.checkCheckbox();
    await inputPage.validateCheckboxChecked(true);

    await inputPage.uncheckCheckbox();
    await inputPage.validateCheckboxChecked(false);
  });

  // RADIO BUTTONS
  test.skip("Validate radio buttons using POM", async ({ page, inputPage }) => {
    await page.goto('/radio-buttons');

    await inputPage.selectRadio("option1");
    await inputPage.validateRadioSelection("option1");

    await inputPage.selectRadio("option2");
    await inputPage.validateRadioSelection("option2");
  });

});
