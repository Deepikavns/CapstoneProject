import LoginPage from "../pageobjects/login";
import OpportunitiesPage from "../pageobjects/opportunities";
import loginData from "../resource/login.json";
import UserMenuPage from "../pageobjects/user-menu";
import { verifyMultipleClickOnElement, hoveroverEffect } from "../utilities/helper"
import opportunities from "../pageobjects/opportunities";

describe('Oppeortunities functionality', () => {

    beforeEach('login to app', async () => {
        await LoginPage.navigateTo();
        await LoginPage.login(loginData.username, loginData.password);
        await UserMenuPage.verifyHomePageLogo();
    })

    it('Verify that clicking on the "Opportunities" link navigates user to correct page.', async () => {
        await OpportunitiesPage.VerifyOpportunitiesNavigation();

    });

    it('Ensure that the link title attribute displays "Opportunities Tab" when hovered over.', async () => {
        await OpportunitiesPage.VerifyTitleAttribute();

    });

    it('Verify hover over effect on opportunities link.', async () => {
        await OpportunitiesPage.verifyHoverOverEffect();

    });

    it('Link text displays correctly("Opportunities")', async () => {
        await OpportunitiesPage.VerifyOpportunitiesLinkText();

    });

    it('Verify behaviour on rapid multiple click of the Opportunities link', async () => {
        await verifyMultipleClickOnElement(OpportunitiesPage.opportunitiesTab)

    });
});