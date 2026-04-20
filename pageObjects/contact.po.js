import {expect} from '@playwright/test'
import { LoginPage } from './login.po';

export class ContactPage{
    constructor(page)
    {
        this.page=page;
        this.addContactBtn='//button[contains(text(), "Add a New Contact")]';
        this.fName='//input[@id="firstName"]';
        this.lName='//input[@id="lastName"]';
        this.email='//input[@id="email"]';
        this.phone='//input[@id="phone"]';
        this.add='//button[@id="submit"]';
        this.contactValidation='(//td[@hidden="true"])[1]'
        this.usernameInput='#email';//css selector
        this.passwordInput='//input[@placeholder="Password"]';
        this.logInButton='//button[@id="submit"]';
        this.error='//span[@id="error"]';
        this.contactTable='//table';
    }
    
    async getContactRowByName(firstName, lastName){
        return await this.page.locator(`//table//tr[contains(., "${firstName}") and contains(., "${lastName}")]//td[1]`).first();
    }
    async contact(fName,lName,email,phone){
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(this.addContactBtn).click({ force: true });
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(this.fName).fill(fName);
        await this.page.locator(this.lName).fill(lName);
        await this.page.locator(this.email).fill(email);
        await this.page.locator(this.phone).fill(phone);
        await this.page.locator(this.add).click({ force: true });
        await this.page.waitForTimeout(2000);
    }
    async login(user,pw){
        await this.page.locator(this.usernameInput).fill(user);
        await this.page.locator(this.passwordInput).fill(pw);
        await this.page.locator(this.logInButton).click();
        await this.page.waitForURL('**/contactList', { timeout: 10000 });
        await this.page.waitForLoadState('networkidle');
    }
    async verifyContactField(){
        const contactValidation = await this.page.locator(this.contactValidation);
        await this.page.waitForTimeout(2000);
        expect(this.addContactBtn).toBeVisible;
        await expect(contactValidation).toContainText('69e');
    }

    async verifyInvalidContactField(){
        const invalidContact = await this.page.locator(this.error);
        await expect(invalidContact).toContainText("Contact validation failed:", { timeout: 10000 })
    }

    async viewcontact(firstName, lastName){
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(1000);
        const row = await this.page.locator(`//table//tr[contains(., "${firstName}") and contains(., "${lastName}")]`).first();
        await row.click({ force: true });
        await this.page.waitForLoadState('networkidle');
    }

    async contactEcit(firstName, lastName, newFirstName){
        await this.page.waitForLoadState('networkidle');
        const editBtn = await this.page.locator('//button[contains(text(), "Edit Contact")]');
        await editBtn.click({ force: true });
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(this.fName).clear();
        await this.page.locator(this.fName).fill(newFirstName);
        await this.page.locator(this.add).click({ force: true });
        await this.page.waitForTimeout(2000);
    }

    async deleteContact(){
        await this.page.waitForTimeout(1000);
        this.page.once('dialog', async dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            await dialog.accept();
        });
        await this.page.locator(this.deleteContact).click();
    }
}