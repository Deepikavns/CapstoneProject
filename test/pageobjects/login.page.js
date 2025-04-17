import { $ } from '@wdio/globals'
import Page from './page.js';


class LoginPage extends Page {
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
    }

    async enterpassword(password) {
        await this.inputPassword.waitForDisplayed();
        await this.inputPassword.setValue(password)
    }

    async login(username, password) {
        await this.enterUsername(username);
        await this.enterpassword(password);
        await this.loginBtn.click();

    }

    async isLoginButtonEnabled(username, password) {
        await this.enterUsername(username);
        await this.enterpassword(password);
        let isEnabled = await this.loginBtn.isEnabled();
        await expect(isEnabled).toBe(true);
    }

    async loginErrorMessage() {
        await expect(this.errorMessage).toBeDisplayed()
    }

    async loginErrorMessageforEmptyusername(username) {
        await this.enterUsername(username);
        await this.inputPassword.clearValue();
        await this.loginBtn.click();
        await expect(this.errorMessage).toBeDisplayed()
    }

    async VerifyHoverEffect() {
        const beforeHover = await this.loginLogo.getCSSProperty('cursor');
        await expect(beforeHover.value).not.toBe('pointer');
        await this.loginBtn.moveTo();
        const afterHover = await this.loginBtn.getCSSProperty('cursor');
        await expect(afterHover.value).toBe('pointer');
        const initialColor = await this.loginBtn.getCSSProperty('background-color')
        await this.loginBtn.moveTo();
        const hoverColor = await this.loginBtn.getCSSProperty('background-color')
        await expect(initialColor).not.toBe(hoverColor);
        await this.loginBtn.click();
        const clickColor = await this.loginBtn.getCSSProperty('background-color');
        await expect(hoverColor).not.toBe(clickColor);
    }


    open() {
        return super.open('/');
    }
}
export default new LoginPage();