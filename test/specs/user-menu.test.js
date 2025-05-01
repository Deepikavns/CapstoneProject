import UserMenuPage from "../pageobjects/user-menu";
import LoginPage from "../pageobjects/login";
import loginData from '../resource/login.json';
import userMenuData from "../resource/usermenu.json"
import { verifyMultipleClickOnElement } from '../utilities/helper'
import userMenuPage from "../pageobjects/user-menu";
describe('UserMenu Dropdown functionality', () => {

    beforeEach('login To app', async () => {
        await LoginPage.navigateTo();
        await LoginPage.login(loginData.username, loginData.password);
        await UserMenuPage.verifyHomePageTitle(userMenuData.expectedTitle);
    })

    it('Verify that clicking the usermenu dropdown button displays the expected options', async () => {
        await userMenuPage.verifyUserMenuOption();
    });

    it('Test if user menu dropdown button closes when clicked again after it has opened.', async () => {
        await UserMenuPage.toggleUserNavigationButton();

    });

    it('Verify that the user navigation button handles rapid clicks smoothly,without any unexpected behaviour', async () => {
        await verifyMultipleClickOnElement(UserMenuPage.userMenuDropDown)
        await UserMenuPage.VerifyMenuItemDisplayed();

    });

    it('Check the title attribute displays "User menu for Deepika Sri" when hover over the user nav button', async () => {
        await UserMenuPage.verifyUserNavTitleOnHover();

    });

    it('Verify hover over effect on user navigation button', async () => {
        await UserMenuPage.verifyHoverOverEffectOnUserMenu();

    });

    it('Verify that the user navigation button is accessible using keyboard navigation(Tab key)', async () => {
        await UserMenuPage.verifyUserMenuAccessibleByTab();

    });


});