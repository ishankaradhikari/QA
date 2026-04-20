import {test, expect} from '@playwright/test';
import loginFixture from "../fixtures/loginFixture.json" assert { type: 'json' };

test('Valid Login test', async({page})=>{
    await page.goto('https://auth.wikimedia.org/enwiki/wiki/Special:UserLogin')
    await expect(page).toHaveTitle('Log in - Wikipedia')
    
    await page.locator('//input[@id="wpName1"]').fill('Sujal sthapit')
    await page.locator('//input[@id="wpPassword1"]').fill('Sujal@123')
    await page.locator('//button[@id="wpLoginAttempt"]').click()

    const name= await page.locator('(//span[text()="Sujal sthapit"])[1]')
})
test('Invalid passsword Login test', async({page})=>{
    await page.goto('https://auth.wikimedia.org/enwiki/wiki/Special:UserLogin')
    await expect(page).toHaveTitle('Log in - Wikipedia')
    
    await page.locator('//input[@id="wpName1"]').fill('Sujal sthapit')
    await page.locator('//input[@id="wpPassword1"]').fill('Suja@123')
    await page.locator('//button[@id="wpLoginAttempt"]').click()

    const error=await page.locator('(//div[@class="cdx-message__content"])[1]')
    
    await expect(error).toBeVisible()
})

test('Invalid username Login test', async({page})=>{
    await page.goto('https://auth.wikimedia.org/enwiki/wiki/Special:UserLogin')
    await expect(page).toHaveTitle('Log in - Wikipedia')
    
    await page.locator('//input[@id="wpName1"]').fill('Suja sthapit')
    await page.locator('//input[@id="wpPassword1"]').fill('Sujal@123')
    await page.locator('//button[@id="wpLoginAttempt"]').click()

    const error=await page.locator('(//div[@class="cdx-message__content"])[1]')
    
    await expect(error).toBeVisible()
})
test('Invalid username and password Login test', async({page})=>{
    await page.goto('https://auth.wikimedia.org/enwiki/wiki/Special:UserLogin')
    await expect(page).toHaveTitle('Log in - Wikipedia')
    
    await page.locator('//input[@id="wpName1"]').fill('Suja sthapit')
    await page.locator('//input[@id="wpPassword1"]').fill('Suja@123')
    await page.locator('//button[@id="wpLoginAttempt"]').click()

    const error=await page.locator('(//div[@class="cdx-message__content"])[1]')
    
    await expect(error).toBeVisible()
})
test('Login without username and password test', async({page})=>{
    await page.goto('https://auth.wikimedia.org/enwiki/wiki/Special:UserLogin')
    await expect(page).toHaveTitle('Log in - Wikipedia')
    
    await page.locator('//input[@id="wpName1"]').fill('')
    await page.locator('//input[@id="wpPassword1"]').fill('')
    await page.locator('//button[@id="wpLoginAttempt"]').click()

    const error=await page.locator('(//div[@class="cdx-message__content"])[1]')
    
    await expect(error).toBeVisible()
})
test('Login with valid username and without password test', async({page})=>{
    await page.goto('https://auth.wikimedia.org/enwiki/wiki/Special:UserLogin')
    await expect(page).toHaveTitle('Log in - Wikipedia')
    
    await page.locator('//input[@id="wpName1"]').fill('Sujal sthapit')
    await page.locator('//input[@id="wpPassword1"]').fill('')
    await page.locator('//button[@id="wpLoginAttempt"]').click()

    const error=await page.locator('(//div[@class="cdx-message__content"])[1]')
    
    await expect(error).toBeVisible()
})
test('Login with invalid username and without password test', async({page})=>{
    await page.goto('https://auth.wikimedia.org/enwiki/wiki/Special:UserLogin')
    await expect(page).toHaveTitle('Log in - Wikipedia')
    
    await page.locator('//input[@id="wpName1"]').fill('Suja sthapit')
    await page.locator('//input[@id="wpPassword1"]').fill('')
    await page.locator('//button[@id="wpLoginAttempt"]').click()

    const error=await page.locator('(//div[@class="cdx-message__content"])[1]')
    
    await expect(error).toBeVisible()
})
test('Login without username and with valid password test', async({page})=>{
    await page.goto('https://auth.wikimedia.org/enwiki/wiki/Special:UserLogin')
    await expect(page).toHaveTitle('Log in - Wikipedia')
    
    await page.locator('//input[@id="wpName1"]').fill('')
    await page.locator('//input[@id="wpPassword1"]').fill('Sujal@123')
    await page.locator('//button[@id="wpLoginAttempt"]').click()

    const error=await page.locator('(//div[@class="cdx-message__content"])[1]')
    
    await expect(error).toBeVisible()
})
test('Login without username and with invalid password test', async({page})=>{
    await page.goto('https://auth.wikimedia.org/enwiki/wiki/Special:UserLogin')
    await expect(page).toHaveTitle('Log in - Wikipedia')
    
    await page.locator('//input[@id="wpName1"]').fill('')
    await page.locator('//input[@id="wpPassword1"]').fill('Suja@123')
    await page.locator('//button[@id="wpLoginAttempt"]').click()

    const error=await page.locator('(//div[@class="cdx-message__content"])[1]')
    
    await expect(error).toBeVisible()
})