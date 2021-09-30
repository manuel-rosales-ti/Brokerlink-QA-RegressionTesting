require('dotenv').config()
const { By, Builder, WebDriver, Key } = require("selenium-webdriver");
const _http = require('selenium-webdriver/http');
require("chromedriver");
const { test_data } = require('./test_data.js')
const assert = require("assert")

describe("Regression Testing Brokerlink, Attribute Schedule.", function () {

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
        await driver.findElement(By.css("button:nth-of-type(3) > .MuiTab-wrapper > span")).click()
    })

    // Steps after all the tests are executed
    after(async () => {

        // Logout
        await driver.findElement(By.css(".MuiBadge-root [focusable]")).click()
        await driver.sleep(500)
        await driver.quit()
    })


    // It block Test Case Create Schedule
    it("Create Schedule Test", async function () {

        // Steps for Test Case Create Schedule

        // Press button Add and enter schedule information
        // Button Add
        await driver.findElement(By.css(".MuiButton-outlined.MuiButton-outlinedPrimary.MuiButton-root.MuiButtonBase-root")).click()
        // Group Name
        await driver.findElement(By.css("input[name='name']")).sendKeys(test_data.schedulerName)
        // Group List
        await driver.findElement(By.css("div:nth-of-type(2) > .MuiPaper-elevation1.MuiPaper-root.MuiPaper-rounded > .MuiFormControl-root.fullwidth-form > .MuiInputBase-formControl.MuiInputBase-fullWidth.MuiInputBase-root.MuiOutlinedInput-root > div#Group")).click()
        await driver.sleep(500)
        await driver.findElement(By.xpath('//*[@id="menu-groupMgmtId"]/div[3]/ul/li[26]')).click()
        // Time Zone
        await driver.findElement(By.css("div:nth-of-type(3) > .MuiPaper-elevation1.MuiPaper-root.MuiPaper-rounded > .MuiFormControl-root.fullwidth-form > .MuiInputBase-formControl.MuiInputBase-fullWidth.MuiInputBase-root.MuiOutlinedInput-root > div#Group")).click()
        await driver.findElement(By.css("ul > li:nth-of-type(2)")).click()
        // Months
        await driver.sleep(1000)
        await driver.findElement(By.css("div:nth-of-type(2) > div[role='button'] svg[role='presentation']")).click()
        await driver.sleep(1000)
        await driver.findElement(By.xpath('//*[@id="panel1bh-content"]/div/span/span/label[1]/span[1]/span[1]/input')).click()
        // Weekdays
        await driver.findElement(By.css("div:nth-of-type(3) > div[role='button'] svg[role='presentation']")).click()
        await driver.sleep(500)
        await driver.findElement(By.xpath('//*[@id="panel2bh-content"]/div/span/span/label[1]/span[1]/span[1]/input')).click()
        // Days
        await driver.findElement(By.css("div:nth-of-type(4) > div[role='button'] svg[role='presentation']")).click()
        await driver.sleep(500)
        await driver.findElement(By.xpath('//*[@id="panel3bh-content"]/div/span/label[9]/span[1]/span[1]/input')).click()
        // Hours
        await driver.findElement(By.css("div:nth-of-type(5) > div[role='button'] svg[role='presentation']")).click()
        await driver.sleep(500)
        await driver.findElement(By.xpath('//*[@id="panel5bh-content"]/div/span/label[10]/span[1]/span[1]/input')).click()
        // Minutes
        await driver.findElement(By.css("div:nth-of-type(6) > div[role='button'] svg[role='presentation']")).click()
        await driver.sleep(500)
        await driver.findElement(By.xpath('//*[@id="panel4bh-content"]/div/span/label[3]/span[1]/span[1]/input')).click()
        // Press button Save
        await driver.findElement(By.css("div[role='dialog']  .MuiButton-outlined.MuiButton-outlinedPrimary.MuiButton-root.MuiButtonBase-root > .MuiButton-label > span")).click()

        // Verification
        await driver.sleep(5000)
        let confirmMessage = await driver.findElement(By.css(".Toastify__toast-body")).getText()
        assert.strictEqual(confirmMessage, test_data.createSchedule)
    })

    // It block Test Edit Attribute Schedule
    it("Edit Attribute Schedule Test", async function () {

        // Steps for Test Case Edit Attribute Schedule

        // Select schedule
        await driver.sleep(5000)
        await driver.findElement(By.xpath("/html//div[@id='simple-tabpanel-2']/div/div/div/div[2]/div/div/table[@class='MuiTable-root']/thead/tr/th[2]/span[@role='button']/div/span[.='Sr.No']")).click()
        await driver.findElement(By.xpath("/html//div[@id='simple-tabpanel-2']/div/div/div/div[2]/div/div/table[@class='MuiTable-root']/thead/tr/th[2]/span[@role='button']/div/span[.='Sr.No']")).click()

        // Press button update and enter information
        await driver.sleep(500)
        await driver.findElement(By.css("tr:nth-of-type(1) > td:nth-of-type(6) > span > svg:nth-of-type(1) > path")).click()
        // await driver.findElement(By.css("input[name='name']")).click()
        // await driver.findElement(By.css("input[name='name']")).sendKeys(test_data.scheduleNameUpdate)
        await driver.sleep(500)
        await driver.findElement(By.css("div:nth-of-type(3) > .MuiPaper-elevation1.MuiPaper-root.MuiPaper-rounded > .MuiFormControl-root.fullwidth-form > .MuiInputBase-formControl.MuiInputBase-fullWidth.MuiInputBase-root.MuiOutlinedInput-root > div#Group")).click()
        await driver.findElement(By.css("ul > li:nth-of-type(1)")).click()

        // Press button Update
        await driver.findElement(By.css("div[role='dialog']  .MuiButton-outlined.MuiButton-outlinedPrimary.MuiButton-root.MuiButtonBase-root > .MuiButton-label > span")).click()

        // Verification
        await driver.sleep(5000)
        let confirmMessage = await driver.findElement(By.css(".Toastify__toast-body")).getText()
        assert.strictEqual(confirmMessage, test_data.changeSchedule)
    })

    // It block Test Case Delete Schedule
    it("Delete Schedule Test", async function () {

        // Steps for Delete Schedule Test

        // Press button Delete
        await driver.sleep(5000)
        await driver.findElement(By.css("tr:nth-of-type(1) > td:nth-of-type(6) > span > svg:nth-of-type(2) > path")).click()
        await driver.findElement(By.css("button:nth-of-type(2) > .MuiButton-label > span")).click()
        // Confirm Delete
        //      await driver.findElement(By.css("button:nth-of-type(2) > .MuiButton-label > span")).click()

        // Verification
        await driver.sleep(5000)
        let confirmMessage = await driver.findElement(By.css(".Toastify__toast-body")).getText()
        assert.strictEqual(confirmMessage, test_data.deleteSchedule)

    })

    // It block Test Case Validation Fields
    it("Validation Fields Test", async function () {

        // Press buttons Add and Save
        await driver.findElement(By.css(".MuiButton-label > span")).click()
        await driver.findElement(By.css("div[role='dialog']  .MuiButton-outlined.MuiButton-outlinedPrimary.MuiButton-root.MuiButtonBase-root > .MuiButton-label > span")).click()

        // Verification
        await driver.sleep(5000)
        let confirmMessage = await driver.findElement(By.css(".MuiGrid-grid-xs-12.MuiGrid-item.MuiGrid-root > .Errorstyle > span")).getText()
        assert.strictEqual(confirmMessage, test_data.validationFieldSchedule)

        // Press button cancel
        await driver.findElement(By.css(".MuiButton-outlined.MuiButton-outlinedSecondary.MuiButton-root.MuiButtonBase-root > .MuiButton-label > span")).click()
    })
})