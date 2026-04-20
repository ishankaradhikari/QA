import {test} from '@playwright/test';
import {LoginPage} from '../pageObjects/login.po';
import testData from'../fixtures/loginFixture.json' assert { type: 'json' };
import contactTestData from '../fixtures/contactFixture.json' assert { type: 'json' };

test.beforeEach(async({page})=>{
    await page.goto('/');
})

test.describe('Valid Login tests',()=>{
    test("login using valid credentials", async({page})=>{
        const login = new LoginPage(page);
        await login.login(testData.validUser.userName, testData.validUser.password);
        await login.verifyValidLogin();
    });
})
test.describe('Invalid Login tests',()=>{
    test("login using invalid username and valid password", async({page})=>{
        const login = new LoginPage(page);
        await login.login(testData.invalidUser.userName, testData.validUser.password);
        await login.verifyInvalidLogin();
    });

    test("login using valid username and invalid password", async({page})=>{
        const login = new LoginPage(page);
        await login.login(testData.validUser.userName, testData.invalidUser.password);
        await login.verifyInvalidLogin();
    });

    test("login using invalid username and invalid password", async({page})=>{
        const login = new LoginPage(page);
        await login.login(testData.invalidUser.userName, testData.invalidUser.password);
        await login.verifyInvalidLogin();
    });

    test("login without username and password", async({page})=>{
        const login = new LoginPage(page);
        await login.login("", "");
        await login.verifyInvalidLogin();
    });

    test("login with valid username and without password", async({page})=>{
        const login = new LoginPage(page);
        await login.login("testData.validUser.userName", "");
        await login.verifyInvalidLogin();
    });





})
