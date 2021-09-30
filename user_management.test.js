require('dotenv').config()
const { By, Builder, WebDriver, Key } = require("selenium-webdriver");
const _http = require('selenium-webdriver/http');
require("chromedriver");
const { test_data } = require('./test_data.js')
const assert = require("assert")

describe("Regression Testing Brokerlink, User Management.", function () {
    
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

        // Select User Management Menu
        await driver.sleep(1000)
        await driver.findElement(By.css("a:nth-of-type(2) > div[role='button']  svg[role='presentation'] > path")).click()
    })

    // Steps after all the tests are executed
    after(async () => {

        // Logout
        await driver.findElement(By.css(".MuiBadge-root [focusable]")).click()
        await driver.sleep(500)
        await driver.quit()
    })

    // it block Test Case Add User Test
    it("Add User Test", async function () {

        // Steps for Test Case Add user

        // Press button Add
        await driver.sleep(1000)
        await driver.findElement(By.css('button:nth-of-type(2) > .MuiButton-label > span')).click()

        // Enter user information
        await driver.findElement(By.css("input#name")).sendKeys(test_data.userName)
        await driver.findElement(By.css("input#email")).sendKeys(test_data.userId)
        await driver.findElement(By.css("input#password")).sendKeys(test_data.userPassword)
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

    // it block Test Case Update User Test
    it("Update User Test", async function () {

        // Steps for Test Case Update User Test

        // Select User
        await driver.findElement(By.css("th:nth-of-type(2) > span[role='button'] > .MuiIcon-root.MuiTableSortLabel-icon.MuiTableSortLabel-iconDirectionAsc.material-icons")).click()
        await driver.sleep(2000)
        await driver.findElement(By.css("tr:nth-of-type(1) > td:nth-of-type(5) > div > svg:nth-of-type(1) > path")).click()

        // Enter user information
        await driver.findElement(By.css("input#name")).sendKeys(test_data.userNameUpdate)

        // Press button Update
        await driver.findElement(By.css(".MuiButton-root.MuiButton-text.MuiButton-textPrimary.MuiButtonBase-root")).click()

        // Verification
        await driver.sleep(5000)
        let confirmMessage = await driver.findElement(By.css(".Toastify__toast-body")).getText()
        assert.strictEqual(confirmMessage, test_data.userUpdated)
    })

    // it block Test Case Change Password Test
    it("Change Password Test", async function () {

        // Steps for Test Case Change Password Test

        // Select User
        await driver.findElement(By.css("button:nth-of-type(1) > .MuiButton-label > span")).click()
        await driver.sleep(1000)
        await driver.findElement(By.css("div#mui-component-select-UserNamePassword")).click()

        // Enter new password
        await driver.findElement(By.css("ul > li:nth-of-type(1)")).sendKeys(test_data.userChangePass, Key.ENTER)
        await driver.findElement(By.css("input#password")).sendKeys(test_data.userNewPass)
        await driver.findElement(By.css("input#confirm_password")).sendKeys(test_data.userNewConfirmPass)

        // Save new password
        await driver.findElement(By.css(".MuiButton-root.MuiButton-text.MuiButton-textPrimary.MuiButtonBase-root > .MuiButton-label > span")).click()

        // Verification
        await driver.sleep(5000)
        let confirmMessage = await driver.findElement(By.css(".Toastify__toast-body")).getText()
        assert.strictEqual(confirmMessage, test_data.userPasswordChanged)
    })

    // it block Test Case Delete User Test
    it("Delete User Test", async function () {

        // Steps for Test Case Delete User Test

        // Select User
        //await driver.findElement(By.css("th:nth-of-type(2) > span[role='button'] > .MuiIcon-root.MuiTableSortLabel-icon.MuiTableSortLabel-iconDirectionAsc.material-icons")).click()
        await driver.sleep(1000)
        await driver.findElement(By.css("tr:nth-of-type(1) > td:nth-of-type(5) > div > svg:nth-of-type(2) > path")).click()

        // Confirm Delete
        await driver.sleep(2000)
        await driver.findElement(By.css(".MuiButton-root.MuiButton-text.MuiButton-textSecondary.MuiButtonBase-root > .MuiButton-label > span")).click()

        // Verification
        await driver.sleep(5000)
        let confirmMessage = await driver.findElement(By.css(".Toastify__toast-body")).getText()
        assert.strictEqual(confirmMessage, test_data.userDeleted)
    })

    // it block Test Case Validation Fields
    it("Validation Fields Test", async function () {

        // Steps for Test Case Validation Fields

        // Press buttons Add, Save
        await driver.findElement(By.css("button:nth-of-type(2) > .MuiButton-label > span")).click()
        await driver.sleep(500)
        await driver.findElement(By.css(".MuiButton-root.MuiButton-text.MuiButton-textPrimary.MuiButtonBase-root")).click()

        // Verification
        await driver.sleep(1000)
        let confirmMessage = await driver.findElement(By.xpath("/html//div[@role='presentation']/div[@role='none presentation']/div[@role='dialog']//div[@class='MuiGrid-root']/div[1]/div[1]/span[@class='Errorstyle']")).getText()
        assert.strictEqual(confirmMessage, test_data.validationFieldName)

        // Press button Cancel
        await driver.findElement(By.css(".MuiButton-root.MuiButton-text.MuiButton-textSecondary.MuiButtonBase-root")).click()
    })

})