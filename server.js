const { Builder, By, Key, Browser } = require("selenium-webdriver");
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');


const service = ()=> chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

async function run() {
    let driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://buscacepinter.correios.com.br/app/endereco/index.php');
    await driver.findElement(By.id("endereco")).sendKeys("04821040");
    await driver.findElement(By.id("btn_pesquisar")).click();

    await driver.manage().setTimeouts( { implicit: 5000 } );

    return driver.findElement(By.xpath("/html/body/main/form/div[1]/div[2]/div/div[4]/table/tbody/tr/td[1]")).getText();

}

run().then((value) => {
    message = value == "Rua Castro Menezes" ? "Success" : "Failure";
    console.log(message);
});

