import { expect } from '@wdio/globals';
import UserMenuPage from './user-menu.js';
import { hoveroverEffect, waitUntil } from '../utilities/helper.js';
import BasePage from './base.js';



class OpportunitiesPage extends BasePage {

    get opportunitiesTitlle() {
        return $('//a[contains(@title,"Opportunities ")]')
    }

    get opportunitiesTab() {
        return $('//a[text()="Opportunities"]');
    }

    get opportunitiesNavigationpage() {
        return $('//h1[text()="Opportunities"]')
    }



    async VerifyOpportunitiesNavigation() {
        await this.clickBtn(this.opportunitiesTab);
        await waitUntil(
            async () => (await browser.getUrl()).includes('/006/o'), 7000, "URL did not change within 7 sec");
        expect(this.opportunitiesNavigationpage).toBeDisplayed();
        expect(browser).toHaveUrl('https://tekarch-e-dev-ed.develop.my.salesforce.com/006/o');
    }

    async VerifyTitleAttribute() {
        await this.opportunitiesTab.isEnabled();
        await this.opportunitiesTab.moveTo()
        const opportunitiestitle = await this.opportunitiesTab.getAttribute('title');
        expect(opportunitiestitle).toBe('Opportunities Tab');
    }



    async verifyHoverOverEffect() {
        const { beforeHover, afterHover, initialColor, hoveredColor } = await hoveroverEffect(UserMenuPage.homePageLogo, this.opportunitiesTab);
        expect(initialColor.value).not.toBe(hoveredColor.value);
        expect(beforeHover.value).not.toBe(afterHover.value);
    }


    async VerifyOpportunitiesLinkText() {
        await waitUntil(async () => await this.opportunitiesTab.isDisplayed(), 5000, "opportunity link did not display in 5 secound")
        const isDisplayed = await this.opportunitiesTab.isDisplayed();
        const actualtext = await this.opportunitiesTab.getText();
        expect(isDisplayed).toBe(true)
        expect(actualtext).toBe('Opportunities');

    }

}




export default new OpportunitiesPage();