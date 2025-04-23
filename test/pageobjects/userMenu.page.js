import { $, browser } from '@wdio/globals'
import Page from './page.js';
import LoginPage from './login.page.js';
import { expect } from '@wdio/globals';
import { waitUntil } from "../utilities/helper"
import userMenuData from "../resource/usermenu.json"

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
        await waitUntil(
            async () => (await browser.getTitle()) === expTitle,
             7000,
             'Did not get title within 7 sec'
            
        );
        const actualtitle = await browser.getTitle();
       expect(actualtitle).toBe(expTitle);
    }

    async verifyHomePageLogo() {
      expect(this.homePageLogo).toBeDisplayed({ timeout: 8000 });
    }

    async verifyUserNavTitleOnHover() {
        await this.userMenuDropDown.isEnabled();
        await this.userMenuDropDown.moveTo();
        expect(this.titleForUserNavButton).toBeDisplayed();
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

         expect(beforeHover.value).not.toBe('pointer');
         expect(afterHover.value).toBe('pointer')
         expect(intialColor.value).not.toBe(hoverColor.value);
         expect(initialBackgroundColor).not.toBe(hoverBackgroundColor);


    }

    async clickOnUserNavigationButton() {
        await this.userMenuDropDown.waitForClickable({ timeout: 3000 })
        await this.userMenuDropDown.click();
       expect(this.userNavMenuItem).toBeDisplayed();

    }

    async toggleUserNavigationButton() {
        await this.clickOnUserNavigationButton();
        await this.userMenuDropDown.waitForClickable({ timeout: 3000 })
        await this.userMenuDropDown.click();
       expect(this.userNavMenuItem).not.toBeDisabled();
        await this.clickOnUserNavigationButton();
        await this.userMenuDropDown.waitForClickable({ timeout: 3000 })
        await this.userMenuDropDown.click();
       expect(this.userNavMenuItem).not.toBeDisabled();
    }

    async VerifyMenuItemDisplayed() {
      expect(this.userNavMenuItem).not.toBeDisabled()
    }

    async clickOnUserNavigationButtonAgain() {
        await this.userMenuDropDown.waitForClickable({ timeout: 3000 })
        await this.userMenuDropDown.click();
       expect(this.userNavMenuItem).not.toBeDisabled()
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
       expect(this.myProfileTitle).toBeDisplayed();
    }

    async selectAndVerifyMySettingPage() {
        await this.selectOption(UserMenuOptions.MY_SETTINGS);
        expect(this.mySettingTitle).toBeDisplayed();
    }

    async selectAndVerifyDeveloperConsoleOption() {
        await this.selectOption(UserMenuOptions.DEVELOPER_CONSOLE)
        await waitUntil(async()=>
            (await browser.getWindowHandles()).length > 1, 8000, "expected secound window to open"
        )

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
        expect(parentUrl).toBe(userMenuData.HomePageURL)
    }

    async selectLogOutOption() {

        await this.selectOption(UserMenuOptions.LOGOUT)
        expect(LoginPage.loginLogo).toBeDisplayed();
    }

    async verifyUserMenuAccessibleByTab() {
         const tabCount=5;
        for (let i = 0; i < tabCount; i++) {
            await browser.keys('Tab');
        }
        let isFocused = await this.userNavLabel.isFocused();
        expect(isFocused).toBe(true);
    }

}

export default new UserMenuPage();


