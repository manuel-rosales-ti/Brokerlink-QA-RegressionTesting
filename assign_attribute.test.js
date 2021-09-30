require('dotenv').config()
const { By, Builder, WebDriver, Key } = require("selenium-webdriver");
const _http = require('selenium-webdriver/http');
require("chromedriver");
const { test_data } = require('./test_data.js')
const assert = require("assert")

describe("Regression Testing Brokerlink, Assign Attribute.", function () {

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

        // Select Attribute Management Menu and option
        await driver.sleep(500)
        await driver.findElement(By.css("a:nth-of-type(4) > div[role='button']  svg[role='presentation'] > path")).click()
        await driver.findElement(By.css("button:nth-of-type(2) > .MuiTab-wrapper > span")).click()
    })

    // Steps after all the tests are executed
    after(async () => {

        // Logout
        await driver.findElement(By.css(".MuiBadge-root [focusable]")).click()
        await driver.sleep(500)
        await driver.quit()
    })


    // It block Test Case Assign Attribute
    it("Assign Attribute Test", async function () {

        // Steps for Test Case Assign attribute

        // Select group and assign attribute
        //await driver.findElement(By.css("div#mui-component-select-selectedGroup")).sendKeys(Key.ARROW_DOWN * 26, Key.ENTER)
        await driver.findElement(By.css("div#mui-component-select-selectedGroup")).sendKeys(Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ENTER)
        await driver.sleep(1000)
        await driver.findElement(By.css("tr:nth-of-type(1) > .MuiTableCell-alignLeft.MuiTableCell-body.MuiTableCell-root.MuiTableCell-sizeSmall")).click()
        await driver.findElement(By.xpath('//*[@id="simple-tabpanel-1"]/div/div/div/div/div[2]/div/div/div[1]/div[1]/div[3]/div/div/span/button')).click()
        await driver.sleep(500)
        await driver.findElement(By.xpath('/html/body/div[4]/div[3]/div/div[2]/form/div/div/div/div/div[2]/div/div/table/tbody/tr[3]/td[1]/span/span[1]/input')).click()

        // // Press button Save
        await driver.findElement(By.css(".MuiButton-root.MuiButton-text.MuiButton-textPrimary.MuiButtonBase-root > .MuiButton-label > span")).click()

        // Verification
        await driver.sleep(5000)
        let confirmMessage = await driver.findElement(By.css(".Toastify__toast-body")).getText()
        assert.strictEqual(confirmMessage, test_data.assignAttribute)
    })

    // It block Test Case Change Attribute Value
    it("Change Attribute Value Test", async function () {

        // Steps for Test Case Change Attribute Value

        // Select attribute value
        await driver.findElement(By.xpath('//*[@id="simple-tabpanel-1"]/div/div/div/div/div[2]/div/div/div[1]/div[2]/div/div/table/tbody/tr/td[2]/div/div/div/select')).click()
        await driver.findElement(By.xpath('//*[@id="simple-tabpanel-1"]/div/div/div/div/div[2]/div/div/div[1]/div[2]/div/div/table/tbody/tr/td[2]/div/div/div/select/option[2]')).click()

        // Save change
        await driver.findElement(By.css(".MuiButton-root.MuiButton-text.MuiButton-textPrimary.MuiButtonBase-root > .MuiButton-label")).click()

        // Verification
        await driver.sleep(5000)
        let confirmMessage = await driver.findElement(By.css(".Toastify__toast-body")).getText()
        assert.strictEqual(confirmMessage, test_data.changeAttribute)
    })

    // It block Test Case Delete Attribute
    it("Delete Attribute Test", async function () {

        // Steps for Delete Attribute Test

        // Press button Delete
        await driver.findElement(By.css(".MuiButtonBase-root.MuiIconButton-colorInherit.MuiIconButton-root.MuiIconButton-sizeSmall  .MuiIcon-root.material-icons")).click()

        // Verification
        await driver.sleep(5000)
        let confirmMessage = await driver.findElement(By.css(".Toastify__toast-body")).getText()
        assert.strictEqual(confirmMessage, test_data.deleteAttribute)

    })
})