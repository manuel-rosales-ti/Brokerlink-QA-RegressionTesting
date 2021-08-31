require('dotenv').config()
const { By, Builder, WebDriver, Key } = require("selenium-webdriver");
const _http = require('selenium-webdriver/http');
require("chromedriver");
const { test_data } = require('./test_data.js')
const assert = require("assert")

describe("Regression Testing Brokerlink, Attribute Management.", function () {

    let driver;

    beforeEach(async () => {// Initialize webdriver in already opened browser
        let sessionId = test_data.sessionIdqa;
        let url = 'http://localhost:9515/';
        let browser = 'chrome';
        let startUrl = 'http://localhost:3000/attribute/UserManagement';


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
    })


    // it block Test Case Add Attribute Test
    it("Add Attribute Test", async function () {

        // Steps for Test Case - Add attribute

        // Press button Add
        await driver.findElement(By.css(".MuiButton-label > span")).click()

        // Enter attribute information
        await driver.findElement(By.css("input[name='groupName']")).sendKeys(test_data.groupName)
        await driver.findElement(By.css("div#mui-component-select-status")).click()
        await driver.findElement(By.css("ul > li:nth-of-type(1)")).click()
        await driver.findElement(By.css("input#confirm_password")).sendKeys(test_data.userConfirmPassword)
        await driver.findElement(By.css("div#mui-component-select-status")).click()
        await driver.findElement(By.css("ul > li:nth-of-type(1)")).click()
        await driver.findElement(By.css("div#mui-component-select-role")).click()
        await driver.findElement(By.css("ul > li:nth-of-type(1)")).click()

        // Press button Save
        await driver.findElement(By.css(".MuiButton-root.MuiButton-text.MuiButton-textPrimary.MuiButtonBase-root")).click()

        // Verification
        await driver.sleep(5000)
        let confirmMessage = await driver.findElement(By.css(".Toastify__toast-body")).getText()
        assert.strictEqual(confirmMessage, test_data.userAdded)

    })
})