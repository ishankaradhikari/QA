import { test } from "@playwright/test"
import { ContactPage } from "../pageObjects/contact.po"
import { LoginPage } from "../pageObjects/login.po";
import { authenticateUser, createEntity, deleteEntity, validateEntity, getEntity } from '../helper/helper.spec.js';
import testData from '../fixtures/loginFixture.json' assert { type: 'json' };
import contactTestData from '../fixtures/contactFixture.json' assert { type: 'json' };

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const login = new LoginPage(page);
    await login.login(testData.validUser.userName, testData.validUser.password);

})


test.describe('adding valid contact details', () => {
    test('contact validation', async ({ page }) => {
        const contact = new ContactPage(page);
        await contact.contact("Shankar", "Adhikari", "shankar@gmail.com", "9898989898");
        await contact.verifyContactField();
    });
})
test.describe('adding invalid contact details', () => {
    test('contact validation for empty fName', async ({ page }) => {
        const contact = new ContactPage(page);
        await contact.contact("", "Adhikari", "Shankar@gmail.com", "9834989898");
        await contact.verifyInvalidContactField();
    });
    test('contact validation for empty lName', async ({ page }) => {
        const contact = new ContactPage(page);
        await contact.contact("Ram", "", "ram@gmail.com", "9998967898");
        await contact.verifyInvalidContactField();
    });
    test('contact validation for empty fName and lName', async ({ page }) => {
        const contact = new ContactPage(page);
        await contact.contact("", "", "shan@gmail.com", "9123434789");
        await contact.verifyInvalidContactField();
    });
})

test('Contact Edit test', async ({page, request})=>{
    const Data ={
        "firstName": "Shankar",
        "lastName": "Adhikari",
        "birthdate": "1998-01-01",
        "email": "shankar@gmail.com",
        "phone": "9898989898",
        "street1": "Kathmandu",
        "city": "Kathmandu",
        "stateProvince": "Bagmati",
        "postalCode": "44600",
        "country": "Nepal"
    };

    const contact = new ContactPage(page);
    const accessToken = await authenticateUser(testData.validUser.userName, testData.validUser.password, {request});
    await createEntity(Data, accessToken, "/contacts", {request});
    page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    await contact.viewcontact("Shankar", "Adhikari");
    await contact.contactEcit("Shankar", "Adhikari", contactTestData.contactEdit.firstName);
})

test('Contact delete test', async ({page, request})=>{
    const Data ={
        "firstName": "Shankar",
        "lastName": "Adhikari",
        "birthdate": "1998-01-01",
        "email": "shankar12@gmail.com",
        "phone": "9898989898",
        "street1": "Kathmandu",
        "city": "Kathmandu",
        "stateProvince": "Bagmati",
        "postalCode": "44600",
        "country": "Nepal"
    };

    const contact = new ContactPage(page);
    const accessToken = await authenticateUser(testData.validUser.userName, testData.validUser.password, {request});
    const id = await createEntity(Data, accessToken, "/contacts", {request});
    console.log('Contact ID to delete:', id);
    
    await deleteEntity(accessToken, `/contacts/${id}`, {request});
    await validateEntity(accessToken, `/contacts/${id}`, '404', {request});
})

test.afterEach(async ({ page }) => {
    await page.close();

})