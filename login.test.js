require('dotenv').config()
const { By, Builder, WebDriver } = require("selenium-webdriver");
const _http = require('selenium-webdriver/http');
require("chromedriver");
const { test_data } = require('./test_data.js')
const assert = require("assert")
//import initWebDriver from './run_web_driver.js'

//describe("Regression Testing Brokerlink, Login and Change Lenguage.", function () {
    describe("Regression Testing Brokerlink, Login and Change Lenguage.", () => {

        let driver;

                // before(async () => {

// driver = await new Builder().forBrowser("chrome").build()

// await driver.get("http://localhost:3000/attribute")

//         })

    // it block Test Case 1 Login Test
    it("Login Test", async function () {

        let sessionId = test_data.sessionIdqa;
        let url = 'http://localhost:9515/';
        let browser = 'chrome';
        let startUrl = 'http://localhost:3000/attribute';

        // Connect to existing session
        driver = await new WebDriver(
            sessionId,
            new _http.Executor(Promise.resolve(url)
                .then(
                    url => new _http.HttpClient(url, null, null))
            )
        );

        // Trying to open URL. If does not work - we need to re-create a session
        await driver.get(startUrl).catch(async r => {
            console.log('Session "' + sessionId + '" not found. Creating new session.');
            driver = await new Builder()
                .usingServer(url)
                .forBrowser(browser)
                .build();
            driver.getSession().then(function (e) {
                console.log('Session: ' + JSON.stringify(e, null, 2));
            });
            driver.get(startUrl);
        });
    
    
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

    it("Change Language", async function () {

        let sessionId = test_data.sessionIdqa;
        let url = 'http://localhost:9515/';
        let browser = 'chrome';
        let startUrl = 'http://localhost:3000/attribute/home';

        // Connect to existing session
        driver = await new WebDriver(
            sessionId,
            new _http.Executor(Promise.resolve(url)
                .then(
                    url => new _http.HttpClient(url, null, null))
            )
        );

        // Trying to open URL. If does not work - we need to re-create a session
        await driver.get(startUrl).catch(async r => {
            console.log('Session "' + sessionId + '" not found. Creating new session.');
            driver = await new Builder()
                .usingServer(url)
                .forBrowser(browser)
                .build();
            driver.getSession().then(function (e) {
                console.log('Session: ' + JSON.stringify(e, null, 2));
            });
            driver.get(startUrl);
        });
    

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