import {expect} from '@playwright/test';

export class LoginPage{
    constructor(page)
    {
        this.page=page;
        this.usernameInput='#email';//css selector
        this.passwordInput='//input[@placeholder="Password"]';
        this.logInButton='//button[@id="submit"]';
        this.logOut='//button[@id="logout"]';
        this.loginValidation='//p[text()="Click on any contact to view the Contact Details"]';
        this.alertMessage='//span[@id="error"]';
    }
    async login(username, password){
        await this.page.locator(this.usernameInput).fill(username);
        await this.page.locator(this.passwordInput).fill(password);
        await this.page.locator(this.logInButton).click();
        await this.page.waitForURL('**/contactList', { timeout: 15000 });
        await this.page.waitForLoadState('networkidle');
    }
    async verifyValidLogin(){
        const LogInValidation = await this.page.locator(this.loginValidation);
        await this.page.waitForTimeout(2000);
        expect(this.logOut).toBeVisible;
        await expect(LogInValidation).toHaveText('Click on any contact to view the Contact Details')
    }
    async verifyInvalidLogin(){
        const InvalidLogin= await this.page.locator(this.alertMessage);
        await expect(InvalidLogin).toHaveText('Incorrect username or password');
    }
}