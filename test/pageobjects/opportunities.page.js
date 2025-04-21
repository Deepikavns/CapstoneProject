import { $ } from '@wdio/globals'
import { expect } from '@wdio/globals';
import Page from './page.js';
import UserMenuPage from './userMenu.page.js';



class OpportunitiesPage extends Page {

    get opportunitiesTitlle() {
        return $('[title="Opportunities Tab"]')
    }
    get opportunitiesTab() {
        return $('//a[text()="Opportunities"]');
    }

    get opportunitiesNavigationpage() {
        return $('//h1[text()="Opportunities"]')
    }

    get OpportunitiesLink() {
        return $('//a[@href="/006/o"]');
    }



    async VerifyOpportunitiesNavigation() {
        await this.opportunitiesTab.isEnabled();
        await this.opportunitiesTab.click();
        await expect(this.opportunitiesNavigationpage).toBeDisplayed();
        await expect(browser).toHaveUrl('https://tekarch-e-dev-ed.develop.my.salesforce.com/006/o');
    }

    async VerifyTitleAttribute() {
        await this.opportunitiesTab.isEnabled();
        await this.opportunitiesTab.moveTo()
       const opportunitiestitle= await this.opportunitiesTab.getAttribute('title');
        await expect( opportunitiestitle).toBe('Opportunities Tab');
    }



    async verifyHoverOverEffect() {

        const beforeHover = await UserMenuPage.homePageLogo.getCSSProperty('cursor');
        const initialColor = await this.opportunitiesTab.getCSSProperty('color');

        await this.opportunitiesTab.moveTo();

        const hoveredColor = await this.opportunitiesTab.getCSSProperty('color');
        const afterHover = await this.opportunitiesTab.getCSSProperty('cursor');

        await expect(initialColor.value).not.toBe(hoveredColor.value);
        await expect(beforeHover.value).not.toBe(afterHover.value);
    }


    async VerifyOpportunitiesLinkTeXt() {
        const isDisplayed = await this.opportunitiesTab.isDisplayed();
        const Actualtext = await this.opportunitiesTab.getText();
        expect(isDisplayed).toBe(true)
        expect(Actualtext).toBe('Opportunities');

    }

}




export default new OpportunitiesPage();