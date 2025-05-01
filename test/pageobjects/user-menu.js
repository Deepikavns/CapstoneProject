
import LoginPage from './login.js';
import { expect } from '@wdio/globals';
import { waitUntil, hoveroverEffect } from "../utilities/helper.js"
import userMenuData from "../resource/usermenu.json"
import BasePage from './base.js';

const UserMenuOptions = {
    MY_PROFILE: 'My Profile',
    MY_SETTINGS: 'My Settings',
    DEVELOPER_CONSOLE: 'Developer Console',
    LOGOUT: 'Logout',

};


class UserMenuPage extends BasePage {

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
        const { beforeHover, afterHover, initialColor, hoveredColor } = await hoveroverEffect(this.homePageLogo, this.userNavLabel);
        expect(initialColor.value).not.toBe(hoveredColor.value);
        expect(beforeHover.value).not.toBe(afterHover.value);

    }


    async clickOnUserNavigationButton() {
        await this.clickBtn(this.userMenuDropDown);
        expect(this.userNavMenuItem).toBeDisplayed();

    }

    async toggleUserNavigationButton() {
        await this.clickOnUserNavigationButton();
        await this.clickBtn(this.userMenuDropDown);
        expect(this.userNavMenuItem).not.toBeDisabled();
        await this.clickOnUserNavigationButton();
        await this.clickBtn(this.userMenuDropDown);
        expect(this.userNavMenuItem).not.toBeDisabled();

    }

    async VerifyMenuItemDisplayed() {
        expect(this.userNavMenuItem).not.toBeDisabled()

    }

    async clickOnUserNavigationButtonAgain() {
        await this.clickBtn(this.userMenuDropDown);
        expect(this.userNavMenuItem).not.toBeDisabled()
    }

    async selectOption(optionText) {
        await this.clickOnUserNavigationButton()
        for (let i = 0; i < await this.userMenuDropDownList.length; i++) {
            const dropDownOptin = await this.userMenuDropDownList[i].getText();
            if (dropDownOptin === optionText) {
                await this.clickBtn(this.userMenuDropDownList[i]);
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
        await waitUntil(async () =>
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

    async verifyUserMenuOption() {
        //Verify my profile
        await this.selectAndVerifyMyProfilePage();
        await browser.back();
        //Verify my Setting
        await this.selectAndVerifyMySettingPage();
        await browser.back();
        //Verify Developer Console
        await this.selectAndVerifyDeveloperConsoleOption();
        //Verify LogOut 
        await this.selectLogOutOption();

    }

    async verifyUserMenuAccessibleByTab() {
        const tabCount = 5;
        for (let i = 0; i < tabCount; i++) {
            await browser.keys('Tab');
        }
        let isFocused = await this.userNavLabel.isFocused();
        expect(isFocused).toBe(true);

    }

}

export default new UserMenuPage();


