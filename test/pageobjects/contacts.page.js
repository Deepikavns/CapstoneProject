import { $ } from '@wdio/globals';
import Page from './page.js';
import { expect } from '@wdio/globals';
import { waitforElement } from '../utilities/helper.js';

class ContactsPage extends Page{

    get contactsLink(){
        return $('[title="Contacts Tab"]');
    }
    get contactsPageText(){
        return $('//h1[text()="Contacts"]');
    }


    async verifyContactLinkNavigation(){
        await this.contactsLink.isEnabled();
        await this.contactsLink.click();
        await waitforElement(
        async() =>(await browser.getUrl()).includes('/003/o')
       )
       const expectUrl=await browser.getUrl()
       expect(expectUrl).toContain('/003/o');

       }

       async verifyContactLinkTitleAttribute(){
        await this.contactsLink.moveTo();
        const title=await this.contactsLink.getAttribute('title');
        expect (title).toBe('Contacts Tab');
       }

async verifyContactsLinkOnDifferentResolutions(){
    const viewports=[
        {width: 375, height: 667},
        {width: 768, height: 1024},
        {width: 1440, height: 900}
    ];

for (const viewport of viewports){
    await browser.setWindowSize(viewport.width,viewport.height);
    await expect (this.contactsLink).toBeDisplayed();
    await expect (this.contactsLink).toBeClickable();
}

}

}
export default new ContactsPage();

 
