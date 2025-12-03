import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./basepage";

export class InputsPage extends BasePage{
  readonly page: Page;

  // Locators
  readonly textInput: Locator;
  readonly numberInput: Locator;
  readonly dropdown: Locator;
  readonly checkbox: Locator;
  readonly radioOption1: Locator;
  readonly radioOption2: Locator;

  constructor(page: Page) {
    super(page)
    this.page = page;
    
    this.textInput = page.locator(".input-box#input-text");
    this.numberInput = page.locator(".input-box#input-number");
    this.dropdown = page.locator("#dropdown");
    //this.checkbox = page.locator("#checkbox1");
    this.checkbox = page.getByLabel("Checkbox 1");
    this.radioOption1 = page.locator('input[value="option1"]');
    this.radioOption2 = page.locator('input[value="option2"]');
  }

  async navigate() {
    await this.page.goto("https://practice.expandtesting.com/inputs");
    await this.page.waitForLoadState();
  }

  // Text input actions
  async enterText(value: string) {
    await this.textInput.fill(value);
  }

  async validateText(value: string) {
    await expect(this.textInput).toHaveValue(value);
  }

  // Number input actions
  async enterNumber(value: string) {
    await this.numberInput.fill(value);
  }

  async validateNumber(value: string) {
    await expect(this.numberInput).toHaveValue(value);
  }

  // Dropdown
  async selectDropdown(value: string) {
    await this.dropdown.selectOption(value);
  }

  async validateDropdown(value: string) {
    await expect(this.dropdown).toHaveValue(value);
  }

  // Checkbox
  async checkCheckbox() {
    await this.checkbox.check();
  }

  async uncheckCheckbox() {
    await this.checkbox.uncheck();
  }

  async validateCheckboxChecked(isChecked: boolean) {
    if (isChecked) {
      await expect(this.checkbox).toBeChecked();
    } else {
      await expect(this.checkbox).not.toBeChecked();
    }
  }

  // Radio buttons
  async selectRadio(option: "option1" | "option2") {
    if (option === "option1") {
      await this.radioOption1.check();
    } else {
      await this.radioOption2.check();
    }
  }

  async validateRadioSelection(selected: "option1" | "option2") {
    if (selected === "option1") {
      await expect(this.radioOption1).toBeChecked();
      await expect(this.radioOption2).not.toBeChecked();
    } else {
      await expect(this.radioOption2).toBeChecked();
      await expect(this.radioOption1).not.toBeChecked();
    }
  }
}
