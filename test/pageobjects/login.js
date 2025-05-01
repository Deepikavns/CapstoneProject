
import BasePage from './base';
import { hoveroverEffect, waitUntil } from "../utilities/helper.js"


class LoginPage extends BasePage {
    get inputUsername() {
        return $('#username')
    }
    get inputPassword() {
        return $('#password')
    }
    get loginBtn() {
        return $('input[id="Login"]')
    }
    get loginLogo() {
        return $('[id="logo"]');
    }

    get errorMessage() {
        return $('[id="error"]');
    }

    async enterUsername(username) {
        await this.inputUsername.waitForDisplayed();
        await this.inputUsername.setValue(username)
        expect(this.inputUsername).toHaveValue(username)
    }

    async enterpassword(password) {
        await this.inputPassword.waitForDisplayed();
        await this.inputPassword.setValue(password);
        expect(this.inputPassword).toHaveValue(password)
    }

    async login(username, password) {
        await this.enterUsername(username);
        await this.enterpassword(password);
        await this.clickBtn(this.loginBtn);

    }

    async isLoginButtonEnabled(username, password) {
        await this.enterUsername(username);
        await this.enterpassword(password);
        let isEnabled = await this.loginBtn.isEnabled();
        expect(isEnabled).toBe(true);
    }

    async loginErrorMessage() {
        expect(this.errorMessage).toBeDisplayed()
    }

    async loginErrorMessageforEmptyusername(username) {
        await this.enterUsername(username);
        await this.inputPassword.clearValue();
        await this.clickBtn(this.loginBtn);
        expect(this.errorMessage).toBeDisplayed()
    }


    async VerifyHoverEffect() {
         const initialColor = await this.loginBtn.getCSSProperty('background-color')
         await this.loginBtn.moveTo();
         const hoverColor = await this.loginBtn.getCSSProperty('background-color')
         expect(initialColor.value).not.toBe(hoverColor.value);
         const { beforeHover, afterHover } = await hoveroverEffect(this.loginLogo, this.loginBtn);
         expect(beforeHover.value).not.toBe(afterHover.value);
    }


    navigateTo() {
        return super.navigateTo('/');
    }
}
export default new LoginPage();