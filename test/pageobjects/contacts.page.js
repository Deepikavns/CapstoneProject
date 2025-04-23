import { $ } from '@wdio/globals';
import Page from './page.js';
import { expect } from '@wdio/globals';
import { waitUntil } from "../utilities/helper"




class ContactsPage extends Page {

    get contactsLink() {
        return $('[title="Contacts Tab"]');
    }
    get contactsPageText() {
        return $('//h1[text()="Contacts"]');
    }
    get cases() {
        return $('[title="Cases Tab"]');
    }


    async verifyContactLinkNavigation() {
        await this.contactsLink.waitForDisplayed({timeout:5000});
        await this.contactsLink.waitForClickable({timeout:5000});
        await this.contactsLink.click();
        await waitUntil(
            async () => (await browser.getUrl()).includes('/003/o'), 6000,
            'URL did not change within 5 sec'
        )
        const expectUrl = await browser.getUrl()
        expect(expectUrl).toContain('/003/o');

    }

    async verifyContactLinkTitleAttribute() {
        await this.contactsLink.moveTo();
        const title = await this.contactsLink.getAttribute('title');
        expect(title).toBe('Contacts Tab');
    }

    async VerifyLinkText() {
        const text = await this.contactsLink.getText();
        expect(text).toBe('Contacts');
    }

    async verifyContactLinkAccessibility() {
        const tabCount = 12;
        await this.contactsLink.waitForDisplayed({timeout:5000})
        for (let i = 0; i < tabCount; i++) {
            await browser.keys('Tab');
        }
        await waitUntil(
        async() => await this.contactsLink.isFocused(),5000,'contact link was not focused')
        let isFocusedContact = await this.contactsLink.isFocused();
         expect(isFocusedContact).toBe(true);

        await browser.keys('Tab');
        await waitUntil(
        async() => await this.cases.isFocused(),5000,'cases link was not focused')

        let isFocused= await this.cases.isFocused();
        expect(isFocused).toBe(true);
       
        await browser.keys(['Shift','Tab'])
        await browser.keys('NUll');
       
        expect(isFocusedContact).toBe(true);


    }

    async verifyContactsLinkOnDifferentResolutions() {
        const viewports = [
            { width: 375, height: 667 },
            { width: 768, height: 1024 },
            { width: 1440, height: 900 }
        ];

        for (const viewport of viewports) {
            await browser.setWindowSize(viewport.width, viewport.height);
            await expect(this.contactsLink).toBeDisplayed();
            await expect(this.contactsLink).toBeClickable();
        }

    }

}
export default new ContactsPage();


