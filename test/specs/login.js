
import LoginPage from '../pageobjects/login.page.js'
import loginData from '../resource/login.json'
import userMenuPage from '../pageobjects/userMenu.page.js';
import { verifyMultipleClickOnElement } from '../utilities/helper.js'


describe('My Login application', () => {
    beforeEach('Launch the website', async () => {
        await LoginPage.open();
    })

    it("Confirm 'Log In'Button is enabled after entering the username and password", async () => {
        await LoginPage.isLoginButtonEnabled(loginData.username, loginData.password);
    })

    it("Verify visual feedback on hover and click the login button.", async () => {
        await LoginPage.VerifyHoverEffect();

    })

    it("Login with valid credentials", async () => {
        await LoginPage.login(loginData.username, loginData.password);
        await userMenuPage.verifyHomePageLogo();

    })

    it("Error message for invalid credentials on login", async () => {
        await LoginPage.login(loginData.invalidUsename, loginData.invalidPassword);
        await LoginPage.loginErrorMessage();

    })

    it("Verify Login Action is not Initiated with Empty Fields", async () => {
        await LoginPage.loginErrorMessageforEmptyusername(loginData.username);

    })

    it("multiple clicking  effect", async () => {
        await LoginPage.loginErrorMessageforEmptyusername(loginData.username);
        await verifyMultipleClickOnElement(LoginPage.loginBtn, 3000);
        await LoginPage.loginErrorMessage();

    })




})

