
import { $, browser } from '@wdio/globals'


export default class BasePage {

    navigateTo(path = ' ') {
        return browser.url(path)
    }

    async clickBtn(element) {
        await element.waitForEnabled({ timeout: 5000 });
        await element.click();

    }

}