import { $, browser } from '@wdio/globals'
import Page from './page.js';
import LoginPage from './login.page.js';
import { expect } from '@wdio/globals';

const UserMenuOptions = {
    MY_PROFILE: 'My Profile',
    MY_SETTINGS: 'My Settings',
    DEVELOPER_CONSOLE: 'Developer Console',
    LOGOUT: 'Logout',

};


class UserMenuPage extends Page {

    get homePageLogo() {
        return $('[id="phHeaderLogoImage"]');
    }
    get userNavButton() {
        return $('[id="userNavButton"]');
    }

    get userMenuDropDown() {
        return $('//div[@id="userNav"]');
    }
    get userNavLabel() {
        return $('span[id="userNavLabel"]');
    }

    get userMenuDropDownList() {
        return $$('//div[@id="userNav-menuItems"]//a');
    }
    get myProfileTitle() {
        return $('//span[@id="tailBreadcrumbNode"]');
    }

    get mySettingTitle() {
        return $('h1[class="noSecondHeader pageType"]');
    }

    get titleForUserNavButton() {
        return $('[title="User menu for Deepika Sri"]')
    }

    get userNavMenuItem() {
        return $('[id="userNav-menuItems"]')
    }

    async verifyHomePageTitle(expTitle) {
        await browser.waitUntil(
            async () => (await browser.getTitle()) === expTitle,
            {
                timeout: 5000,
            }
        );
        const actualtitle = await browser.getTitle();
        await expect(actualtitle).toBe(expTitle);
    }

    async verifyHomePageLogo() {
        await expect(this.homePageLogo).toBeDisplayed({ timeout: 5000 });
    }

    async verifyUserNavTitleOnHover() {
        await this.userMenuDropDown.isEnabled();
        await this.userMenuDropDown.moveTo();
        await expect(this.titleForUserNavButton).toBeDisplayed();
    }

    async verifyHoverOverEffectOnUserMenu() {
        await this.verifyHomePageLogo();
        const beforeHover = await this.homePageLogo.getCSSProperty('cursor');
        const intialColor = await this.userNavLabel.getCSSProperty('color');
        const initialBackgroundColor = await this.userMenuDropDown.getCSSProperty('background-color')

        await this.userMenuDropDown.moveTo();

        const hoverBackgroundColor = await this.userMenuDropDown.getCSSProperty('background-color')
        const hoverColor = await this.userNavLabel.getCSSProperty('color');
        const afterHover = await this.userMenuDropDown.getCSSProperty('cursor');

        await expect(beforeHover.value).not.toBe('pointer');
        await expect(afterHover.value).toBe('pointer')
        await expect(intialColor.value).not.toBe(hoverColor.value);
        await expect(initialBackgroundColor).not.toBe(hoverBackgroundColor);


    }

    async clickOnUserNavigationButton() {
        await this.userMenuDropDown.waitForClickable({ timeout: 3000 })
        await this.userMenuDropDown.click();
        await expect(this.userNavMenuItem).toBeDisplayed();

    }

    async toggleUserNavigationButton() {
        await this.clickOnUserNavigationButton();
        await this.userMenuDropDown.waitForClickable({ timeout: 3000 })
        await this.userMenuDropDown.click();
        await expect(this.userNavMenuItem).not.toBeDisabled();
        await this.clickOnUserNavigationButton();
        await this.userMenuDropDown.waitForClickable({ timeout: 3000 })
        await this.userMenuDropDown.click();
        await expect(this.userNavMenuItem).not.toBeDisabled();
    }

    async VerifyMenuItemDisplayed() {
        await expect(this.userNavMenuItem).not.toBeDisabled()
    }

    async clickOnUserNavigationButtonAgain() {
        await this.userMenuDropDown.waitForClickable({ timeout: 3000 })
        await this.userMenuDropDown.click();
        await expect(this.userNavMenuItem).not.toBeDisabled()
    }

    async selectOption(optionText) {
        await this.clickOnUserNavigationButton()
        for (let i = 0; i < await this.userMenuDropDownList.length; i++) {
            const dropDownOptin = await this.userMenuDropDownList[i].getText();
            if (dropDownOptin === optionText) {
                await this.userMenuDropDownList[i].click();
                break;

            }
        }

    }

    async selectAndVerifyMyProfilePage() {
        await this.selectOption(UserMenuOptions.MY_PROFILE);
        await expect(this.myProfileTitle).toBeDisplayed();
    }

    async selectAndVerifyMySettingPage() {
        await this.selectOption(UserMenuOptions.MY_SETTINGS);
        await expect(this.mySettingTitle).toBeDisplayed();
    }

    async selectAndVerifyDeveloperConsoleOption() {
        await this.selectOption(UserMenuOptions.DEVELOPER_CONSOLE)

        const windowHandles = await browser.getWindowHandles();
        const parentWindow = windowHandles[0];
        const childWindow = windowHandles[1];
        await browser.switchToWindow(childWindow);
        const childWindowUrl = await browser.getUrl();
        console.log('childWindow URL:', childWindowUrl);
        await browser.closeWindow();
        await browser.switchToWindow(parentWindow);
        const parentUrl = await browser.getUrl();
        console.log('Parent window URL:', parentUrl);
        await expect(parentUrl).toBe('https://tekarch-e-dev-ed.develop.my.salesforce.com/setup/forcecomHomepage.apexp?setupid=ForceCom')
    }

    async selectLogOutOption() {

        await this.selectOption(UserMenuOptions.LOGOUT)
        await expect(LoginPage.loginLogo).toBeDisplayed();
    }

    async verifyUserMenuAccessibleByTab() {

        for (let i = 0; i < 5; i++) {
            await browser.keys('Tab');
        }
        let isFocused = await this.userNavLabel.isFocused();
        await expect(isFocused).toBe(true);
    }

}

export default new UserMenuPage();


