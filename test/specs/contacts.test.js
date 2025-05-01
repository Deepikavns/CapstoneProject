import LoginPage from '../pageobjects/login';
import loginData from '../resource/login.json';
import UserMenuPage from '../pageobjects/user-menu';
import ContactsPage from '../pageobjects/contacts';
describe('Contacts functionality', () => {

    beforeEach('login to app', async () => {
        await LoginPage.navigateTo();
        await LoginPage.login(loginData.username, loginData.password);
        await UserMenuPage.verifyHomePageLogo();
    })

    it('Verify that clicking the Contacts link navigates the user to the correct URL("/003/o").', async () => {
        await ContactsPage.verifyContactLinkNavigation();

    })

    it('Verify behaviour of Contacts link on different screen resolutions', async () => {
        await ContactsPage.verifyContactsLinkOnDifferentResolutions();

    })

    it('Check if the title attribute is displayed as tooltip when hovering over the Contacts link', async () => {
        await ContactsPage.verifyContactLinkTitleAttribute();

    })

    it('Verify that the Contacts link is accessible using keyboard navigation(Tab key)', async () => {
        await ContactsPage.verifyContactLinkAccessibility();

    })

    it('Link text displays Contacts correctly', async () => {
        await ContactsPage.VerifyLinkText();

    })

})




