# Automation Testing for Brokerlink application

This file contains the steps to properly and successfully execute the automated regression testing for Intact CAVI application. 

## Pre requisites for testing

1) Access to Intact CAVI application (laboratory ambient): http://100.77.84.33:3000/attribute/login
2) A valid username and password is required to access the application.
3) Applications required and installed:
- Git bash
- Java script
- Node js
- Visual Studio Code
- Selenium WebDriver
- Mocha
4) The test can only be executed in the management station 172.21.103.30.
Jump to the management stations using RD from TC3WLVMGT01 (172.21.220.207). A user from the tc3 domain is required to login to these servers.

## Installation

1) Clone the project with Git bash in your selected directory.
2) Run the commands to install Selenium WebDriver and Mocha:
- Selenium: 
```
npm install --save selenium-webdriver chromedriver
```
Make sure you have the correct Selenium driver for the version of google chorme installed on your computer. More information and documentation can be found in: https://www.selenium.dev/downloads/.

- Mocha: 
```
npm install mocha
```

## Steps to execute the tests

1) Commands to run specific modules of testing (edit scripts):
```
npm run test-assign-attribute
npm run test-attribute-group
npm run test-attribute-schedule
npm run test-login
npm run test-user-management
```
2) Command to run all the regression testing in one execution:
```
npm run regression-testing-brokerlink
```

If you only require to run one specific option, just add .only after the it block.