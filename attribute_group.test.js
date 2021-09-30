require('dotenv').config()
const { By, Builder, WebDriver, Key } = require("selenium-webdriver");
const _http = require('selenium-webdriver/http');
require("chromedriver");
const { test_data } = require('./test_data.js')
const assert = require("assert")

describe("Regression Testing Brokerlink, Attribute Group Management.", function () {

    let driver;

    // Steps before all the tests are executed
    before(async () => {

        // To open Brokerlink app
        driver = await new Builder().forBrowser("chrome").build()
        await driver.get("http://100.77.84.33:3000/attribute/login")

        driver.manage().window().maximize()

        // Login - Enter user and password
        await driver.findElement(By.css('input#email')).sendKeys(test_data.emailLogin)
        await driver.findElement(By.css('input#password')).sendKeys(test_data.passwordLogin)
        await driver.findElement(By.css('.MuiButton-label > span')).click()

        // Change language
        await driver.findElement(By.css('div#mui-component-select-options')).click()
        await driver.findElement(By.css('ul > li:nth-of-type(1)')).click()

        // Select Attribute Management Menu
        await driver.sleep(500)
        await driver.findElement(By.css("a:nth-of-type(4) > div[role='button']  svg[role='presentation'] > path")).click()
    })

    // Steps after all the tests are executed
    after(async () => {

        // Logout
        await driver.findElement(By.css(".MuiBadge-root [focusable]")).click()
        await driver.sleep(500)
        await driver.quit()
    })


    // it block Test Case Add Group Test
    it("Add Group Test", async function () {

        // Steps for Test Case - Add attribute

        // Press button Add
        await driver.findElement(By.css(".MuiButton-label > span")).click()

        // Enter group information
        await driver.findElement(By.css("input[name='groupName']")).sendKeys(test_data.groupName)
        await driver.findElement(By.css("div#mui-component-select-status")).click()
        await driver.findElement(By.css("ul > li:nth-of-type(1)")).click()
        await driver.findElement(By.xpath("/html/body/div[3]/div[3]/div/div[2]/form/div/div[2]/div[2]/div/div/table/tbody/tr[2]/td[1]/span/span[1]/input")).click()

        // Press button Save
        await driver.findElement(By.css("div[role='dialog']  .MuiButton-outlined.MuiButton-outlinedPrimary.MuiButton-root.MuiButtonBase-root > .MuiButton-label > span")).click()

        // Verification
        await driver.sleep(5000)
        let confirmMessage = await driver.findElement(By.css(".Toastify__toast-body")).getText()
        assert.strictEqual(confirmMessage, test_data.groupAdded)
    })

    // it bock Test Case Update Group Test
    it("Update Group Test", async function () {

        // Steps for Test Case Update Group

        // Select group
        await driver.findElement(By.css("th:nth-of-type(2) > span[role='button'] > .MuiIcon-root.MuiTableSortLabel-icon.MuiTableSortLabel-iconDirectionAsc.material-icons")).click()
        await driver.findElement(By.css("th:nth-of-type(2) > span[role='button'] > .MuiIcon-root.MuiTableSortLabel-icon.MuiTableSortLabel-iconDirectionAsc.material-icons")).click()
        await driver.findElement(By.css("tr:nth-of-type(1) > td:nth-of-type(4) > span > svg:nth-of-type(1) > path")).click()

        // Enter group information
        await driver.findElement(By.css("input[name='groupName']")).sendKeys(test_data.groupNameUpdate)
        await driver.findElement(By.xpath("/html/body/div[3]/div[3]/div/div[2]/form/div/div[2]/div[2]/div/div/table/tbody/tr[3]/td[1]/span/span[1]/input")).click()

        // Press button Update
        await driver.findElement(By.xpath("/html/body/div[3]/div[3]/div/div[3]/button[2]")).click()

        // Verification
        await driver.sleep(5000)
        let confirmMessage = await driver.findElement(By.css(".Toastify__toast-body")).getText()
        assert.strictEqual(confirmMessage, test_data.groupUpdated)
    })

    // it block Test Case Delete Group
    it("Delete Group Test", async function () {

        // Steps for Test Case Delete Group

        // Select group
        await driver.findElement(By.css("tr:nth-of-type(1) > td:nth-of-type(4) > span > svg:nth-of-type(2) > path")).click()

        // Confirm delete
        await driver.findElement(By.css(".MuiButton-outlined.MuiButton-outlinedSecondary.MuiButton-root.MuiButtonBase-root > .MuiButton-label > span")).click()

        // Verification
        await driver.sleep(5000)
        let confirmMessage = await driver.findElement(By.css(".Toastify__toast-body")).getText()
        assert.strictEqual(confirmMessage, test_data.groupDeleted)
    })

    // it block Test Case Validation Fields
    it("Validation Fields Test", async function () {

        // Steps for Validation Fields Test

        // Press buttons Add, Save
        await driver.findElement(By.css(".MuiButton-label > span")).click()
        await driver.findElement(By.css("div[role='dialog']  .MuiButton-outlined.MuiButton-outlinedPrimary.MuiButton-root.MuiButtonBase-root > .MuiButton-label > span")).click()

        // Verification
        await driver.sleep(1000)
        let confirmMessage = await driver.findElement(By.css("div:nth-of-type(1) > .Errorstyle > span")).getText()
        assert.strictEqual(confirmMessage, test_data.validationFieldGroupName)

        // Press button Cancel
        await driver.findElement(By.css(".MuiButton-outlined.MuiButton-outlinedSecondary.MuiButton-root.MuiButtonBase-root > .MuiButton-label > span")).click()

    })
})