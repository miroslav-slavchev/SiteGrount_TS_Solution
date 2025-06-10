import {
  Locator,
} from '@playwright/test';
import { SearchContext } from '../context/searchContext';
import { By, } from '../locate/by';
import { UiContext } from '../context/uiContext';

export class UiElement extends UiContext {
  constructor(searchContext: SearchContext, by: By) {
    super(searchContext, by);
  }
  and(locator: Locator): Locator {
      return this.locator.and(locator);
    }
  
    async ariaSnapshot(options?: Parameters<Locator['ariaSnapshot']>[0]) {
      return await this.locator.ariaSnapshot(options);
    }
  
    async blur(options?: Parameters<Locator['blur']>[0]) {
      await this.locator.blur(options);
    }
  
    async boundingBox(options?: Parameters<Locator['boundingBox']>[0]) {
      return await this.locator.boundingBox(options);
    }
  
    async check(options?: Parameters<Locator['check']>[0]) {
      await this.locator.check(options);
    }
  
    async clear(options?: Parameters<Locator['clear']>[0]) {
      await this.locator.clear(options);
    }
  
    async click(options?: Parameters<Locator['click']>[0]) {
      await this.locator.click(options);
    }
  
    async dblClick(options?: Parameters<Locator['dblclick']>[0]) {
      await this.locator.dblclick(options);
    }
  
    async dispatchEvent(type: string, eventInit?: any, options?: Parameters<Locator['dispatchEvent']>[2]) {
      await this.locator.dispatchEvent(type, eventInit, options);
    }
  
    async dragTo(target: Locator, options?: Parameters<Locator['dragTo']>[1]) {
      await this.locator.dragTo(target, options);
    }
  
    async elementHandle(options?: Parameters<Locator['elementHandle']>[0]) {
      return await this.locator.elementHandle(options);
    }
  
    async fill(value: string, options?: Parameters<Locator['fill']>[1]) {
      await this.locator.fill(value, options);
    }
  
    filter(options?: Parameters<Locator['filter']>[0]) {
      return this.locator.filter(options);
    }
  
    async focus(options?: Parameters<Locator['focus']>[0]) {
      await this.locator.focus(options);
    }
  
    frameLocator(selector: string) {
      return this.locator.frameLocator(selector);
    }
  
    async getAttribute(name: string, options?: Parameters<Locator['getAttribute']>[1]) {
      return await this.locator.getAttribute(name, options);
    }
  
    async hover(options?: Parameters<Locator['hover']>[0]) {
      await this.locator.hover(options);
    }
  
    async innerHTML(options?: Parameters<Locator['innerHTML']>[0]) {
      return await this.locator.innerHTML(options);
    }
  
    async innerText(options?: Parameters<Locator['innerText']>[0]) {
      return await this.locator.innerText(options);
    }
  
    async inputValue(options?: Parameters<Locator['inputValue']>[0]) {
      return await this.locator.inputValue(options);
    }
  
    async isChecked(options?: Parameters<Locator['isChecked']>[0]) {
      return await this.locator.isChecked(options);
    }
  
    async isDisabled(options?: Parameters<Locator['isDisabled']>[0]) {
      return await this.locator.isDisabled(options);
    }
  
    async isEditable(options?: Parameters<Locator['isEditable']>[0]) {
      return await this.locator.isEditable(options);
    }
  
    async isEnabled(options?: Parameters<Locator['isEnabled']>[0]) {
      return await this.locator.isEnabled(options);
    }
  
    async isHidden(options?: Parameters<Locator['isHidden']>[0]) {
      return await this.locator.isHidden(options);
    }
  
    async isVisible(options?: Parameters<Locator['isVisible']>[0]) {
      return await this.locator.isVisible(options);
    }
  
    async press(key: string, options?: Parameters<Locator['press']>[1]) {
      await this.locator.press(key, options);
    }
  
    async pressSequentially(text: string, options?: Parameters<Locator['pressSequentially']>[1]) {
      await this.locator.pressSequentially(text, options);
    }
  
    async screenshot(options?: Parameters<Locator['screenshot']>[0]) {
      return await this.locator.screenshot(options);
    }
  
    async scrollIntoViewIfNeeded(options?: Parameters<Locator['scrollIntoViewIfNeeded']>[0]) {
      await this.locator.scrollIntoViewIfNeeded(options);
    }
  
    async selectText(options?: Parameters<Locator['selectText']>[0]) {
      await this.locator.selectText(options);
    }
  
    async setChecked(checkedState: boolean, options?: Parameters<Locator['setChecked']>[1]) {
      await this.locator.setChecked(checkedState, options);
    }
  
    async tap(options?: Parameters<Locator['tap']>[0]) {
      await this.locator.tap(options);
    }
  
    async textContent(options?: Parameters<Locator['textContent']>[0]) {
      const text = await this.locator.textContent(options);
      return text!;
    }
  
    async uncheck(options?: Parameters<Locator['uncheck']>[0]) {
      await this.locator.uncheck(options);
    }
  
    async waitFor(options?: Parameters<Locator['waitFor']>[0]) {
      await this.locator.waitFor(options);
    }
  
    async waitForAttributeValue(
      attributeName: string,
      expectedValue: string,
      timeout = 3000,
      pollingIntervalMs = 100
    ) {
      const start = Date.now();
      while (Date.now() - start < timeout) {
        const attr = await this.locator.getAttribute(attributeName);
        if (attr === expectedValue) return;
        await new Promise((res) => setTimeout(res, pollingIntervalMs));
      }
  
      throw new Error(`Attribute '${attributeName}' did not reach value '${expectedValue}' within ${timeout}ms.`);
    }
}
