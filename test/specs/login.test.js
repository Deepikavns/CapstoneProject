
import LoginPage from '../pageobjects/login.js'
import loginData from '../resource/login.json'
import userMenuPage from '../pageobjects/user-menu.js';
import { verifyMultipleClickOnElement } from '../utilities/helper.js'


describe('My Login application', () => {
    beforeEach('Launch the website', async () => {
        await LoginPage.navigateTo();
    })

    it("Confirm 'Log In'Button is enabled after entering the username and password", async () => {
        await LoginPage.isLoginButtonEnabled(loginData.username, loginData.password);
    })

    it("Verify visual feedback on hover the login button.", async () => {
        await LoginPage.VerifyHoverEffect();

    })

    it("Login with valid credentials", async () => {
        await LoginPage.login(loginData.username, loginData.password);
        await userMenuPage.verifyHomePageLogo();

    })

    it("Error message for invalid credentials on login", async () => {
        await LoginPage.login(loginData.invalidUsername, loginData.invalidPassword);
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

