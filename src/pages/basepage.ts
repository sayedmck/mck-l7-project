import { Locator, Page } from "@playwright/test";
import path from "path";
import { loadEnvFile } from "process";

export class BasePage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async waitForElementAttached(locator: string, timeout?: number) {
        await this.page.waitForSelector(locator, {
            state: 'attached',
            timeout: timeout ?? 30000, // Defaults to 30 seconds if not provided
        });
    }

    async waitForPageLoadState() {
        await this.page.waitForLoadState('load', { timeout: 10000 });
    }

    async selectListItem(locator: Locator, optionText: string) {
        await locator.dblclick();
        await this.waitForPageLoadState();
        await this.page.keyboard.press('ArrowDown');
        await this.waitForPageLoadState();
    
        const option = this.page.locator('li.x-boundlist-item', { hasText: optionText });
        await option.click();
      }

      async waitForPageNavigation(event: string){
        switch(event){
            case `networkidle`:
                await this.page.waitForNavigation({waitUntil: 'networkidle', timeout: 10000});
                break;
             
            case `load`:
                await this.page.waitForNavigation({waitUntil: 'load', timeout: 10000});  
                break;
           
            case `domcontentload`:
                await this.page.waitForNavigation({waitUntil: 'domcontentloaded', timeout: 10000});
                break;    
        }
    }

    async waitForPageLoadStatewithParam(state: string){
        switch(state){
            case  `networkidle`:
                await this.page.waitForLoadState('networkidle', {timeout: 10000});
                break;

            case `load`:
                await this.page.waitForLoadState('load', {timeout: 10000});
                break;
               
            case `domcontentloaded`:
                await this.page.waitForLoadState('domcontentloaded', {timeout: 10000});
                break;    
        }
    }

    async jsClick(locator: string){
        await this.waitForElementAttached(locator);
        await this.page.$eval(locator, (element: HTMLElement)=> element.click());
    }

    async delay(time: number): Promise<void> {
        return new Promise(function (resolve) {
            setTimeout(resolve, time);
        });
    }

    async boundingBoxClickElement(locator: string): Promise<void> {
        await this.delay(1000);
        const elementHandle =  this.page.locator(locator);
        const box =await elementHandle.boundingBox();
        await this.page.mouse.click(box!.x +box!.width/2, box!.y + box!.height/2);
    }

    async dragAndDrop(dragElementLocator: string, dropElementLocator: string): Promise<void> {
        await this.page.dragAndDrop(dragElementLocator, dropElementLocator);
    }

    async downloadFile(locator: string): Promise<string> {
        const [download] = await Promise.all([
            this.page.waitForEvent(`download`),
            this.page.click(locator)
        ]);
        await download.saveAs(path.join(__dirname, `../Downloads`, download.suggestedFilename()));
        return download.suggestedFilename();
    }

    async verifyElementIsDisplayed(locator: string, errorMessage: string): Promise<void> {
        await this.page.waitForSelector(locator, { state: `visible`, timeout: 10000 })
            .catch(() => { throw new Error(`${errorMessage}`); });
    }

    async waitForDropdownItemVisible(text: string, timeout: number = 30000): Promise<void> {
        await this.page.locator('li.x-boundlist-item', { hasText: text }).waitFor({
          state: 'visible',
          timeout
        });
      }

    async typeAndSelectDropdown(locator: Locator, value: string): Promise<void> {
        await locator.type(value, { delay: 100 });
        await this.page.keyboard.press('ArrowDown');
        const option = this.page.locator('li.x-boundlist-item', { hasText: value });
        await option.click();
        await this.page.keyboard.press('Tab');
    }

    async waitForLocator(
        locator: Locator,
        options: { state?: 'visible' | 'attached' | 'detached' | 'hidden'; timeout?: number } = {}
      ): Promise<void> {
        const { state = 'visible', timeout = 10000 } = options;
        await locator.waitFor({ state, timeout });
      }
      
      async typeAndBringDropdown(locator: Locator, value: string): Promise<void> {
        await locator.type(value, { delay: 100 });
        await this.page.keyboard.press('ArrowDown');
 
      }

    async selectDropDown(locator: Locator) {
        await locator.dblclick();
        await this.waitForPageLoadState();
        await this.page.keyboard.press('ArrowDown');
        await this.waitForPageLoadState();
    }
	
	async clickLinkByText(text: string) {
    await this.page.getByRole('link', { name: text }).click();
  }

    async closePopupIfPresent() {
    const popup = this.page.locator('div.ns-wfhrd-e-7'); // parent div of the pop-up
  
    if (await popup.isVisible({ timeout: 3000 })) {
      console.log("Popup detected. Closing it.");
      await popup.locator('a').click(); // click the link to close
      // or you can press ESC
      // await page.keyboard.press('Escape');
    } else {
      console.log("No popup detected.");
    }
}

}