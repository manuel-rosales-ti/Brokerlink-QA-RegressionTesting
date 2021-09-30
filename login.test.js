require('dotenv').config()
const { By, Builder, WebDriver } = require("selenium-webdriver");
const _http = require('selenium-webdriver/http');
require("chromedriver");
const { test_data } = require('./test_data.js')
const assert = require("assert")

describe("Regression Testing Brokerlink, Login and Change Lenguage.", () => {

    let driver;

    after(async () => {
        await driver.quit() 
    })

    // it block Test Case Login
    it("Login Test", async function () {

        // To open Brokerlink app
        driver = await new Builder().forBrowser("chrome").build()
        await driver.get("http://100.77.84.33:3000/attribute/login")
        driver.manage().window().maximize()

        // Steps for Test Case Login

        // Enter user and password
        await driver.findElement(By.css('input#email')).sendKeys(test_data.emailLogin)
        await driver.findElement(By.css('input#password')).sendKeys(test_data.passwordLogin)
        await driver.findElement(By.css('.MuiButton-label > span')).click()

        // Verification
        await driver.sleep(5000)
        let confirmMessage = await driver.findElement(By.css('.MuiTypography-colorInherit.MuiTypography-noWrap.MuiTypography-root.MuiTypography-subtitle1')).getText()
        assert.strictEqual(confirmMessage, test_data.confirmUserLogin)
    })

    // it block Test Case Change Language
    it("Change Language", async function () {

        await driver.get("http://100.77.84.33:3000/attribute/home")

        // Steps for Test Case Change Language

        // Select Language
        await driver.findElement(By.css('div#mui-component-select-options')).click()
        await driver.findElement(By.css('ul > li:nth-of-type(1)')).click()

        // Verification
        await driver.findElement(By.css('.MuiButtonBase-root.MuiIconButton-colorInherit.MuiIconButton-edgeStart.MuiIconButton-root')).click()
        let confirmMessage = await driver.findElement(By.css('.active')).getText()
        assert.strictEqual(confirmMessage, test_data.iconText)
    })
})