import LoginPage from "../pageobjects/login.page";
import opportunitiesPage from "../pageobjects/opportunities.page";
import loginData from "../resource/login.json";
import UserMenuPage from "../pageobjects/userMenu.page";
import { verifyMultipleClickOnElement } from "../utilities/helper"

describe('Oppeortunities functionality', () => {

     beforeEach ('login to app',async() => {
        await LoginPage.open();
        await LoginPage.login(loginData.username,loginData.password);
        await UserMenuPage.verifyHomePageLogo();
     })


    it('Verify that clicking on the "Opportunities" link navigates user to correct page.', async() => {
        await opportunitiesPage.VerifyOpportunitiesNavigation();
        
    });

    it('Ensure that the link title attribute displays "Opportunities Tab" when hovered over.', async() => {
        await opportunitiesPage.VerifyTitleAttribute();
        
    });

    it('Verify hover over effect on opportunities link.', async() => {
        await opportunitiesPage.verifyHoverOverEffect();
        
    });

    it('Link text displays correctly("Opportunities")', async() => {
        await opportunitiesPage.VerifyOpportunitiesLinkTeXt();
        
    });
    
    it('Verify behaviour on rapid multiple click of the Opportunities link', async() => {
        await verifyMultipleClickOnElement(opportunitiesPage.opportunitiesTab)
        
    });
});