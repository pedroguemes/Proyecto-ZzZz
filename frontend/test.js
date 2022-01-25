const { Builder, By } = require('selenium-webdriver')
const assert = require('assert')
const chrome = require('selenium-webdriver/chrome')
const chromedriver = require('chromedriver')

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build())

const credenciales = {
    email: 'selenium@gmail.com',
    password: '12345678'
}


function testing() {

    describe('Testing GAME - ADMIN', function () {
        this.timeout(30000)
        let webDriver = new Builder().forBrowser('chrome').build()
        webDriver.manage().window().maximize()
        it('Verificacion de visualizacion de NFTs pendientes - Debe encontrar un Nft, cuyo estado es "pendiente"', async () => {

            await webDriver.get('https://proyectzzzz.netlify.app/SignIn')
            await webDriver.sleep(2000)
            await webDriver.findElement(By.name('email')).sendKeys(credenciales.email)
            await webDriver.sleep(2000)
            await webDriver.findElement(By.name('password')).sendKeys(credenciales.password)
            await webDriver.sleep(2000)
            await webDriver.findElement(By.id('submit')).click()
            await webDriver.sleep(2000)
            await webDriver.get('https://proyectzzzz.netlify.app/Profile')
            await webDriver.sleep(4000)
            await webDriver.findElement(By.css('#root > div.total-profile-container > div.nav-profile-col > svg:nth-child(2)')).click()
            await webDriver.sleep(2000)
            const texto = await webDriver.findElement(By.css("#root > div.total-profile-container > div.profile-render-constant > section > article:nth-child(3) > div > div.nfts-container > div > div > h2:nth-child(1)")).getText()
            assert.strictEqual(texto, "NFT prime")
            await webDriver.sleep(2000)
            await webDriver.findElement(By.css("#root > div.total-profile-container > div.nav-profile-col > svg:nth-child(1)")).click()
            await webDriver.sleep(2000)
            await webDriver.findElement(By.css("#root > div.total-profile-container > div.profile-render-constant > div > div > div.user-header-container > div:nth-child(1) > div:nth-child(2)")).click()


        })
        it('Verificacion de NFT de typo game - Debe encontrar un mensaje haciendo referencia a la falta de NFT de tipo "Game"', async () => {

            await webDriver.get('https://proyectzzzz.netlify.app/SignIn')
            await webDriver.sleep(2000)
            await webDriver.findElement(By.name('email')).sendKeys(credenciales.email)
            await webDriver.sleep(2000)
            await webDriver.findElement(By.name('password')).sendKeys(credenciales.password)
            await webDriver.sleep(2000)
            await webDriver.findElement(By.id('submit')).click()
            await webDriver.sleep(2000)
            await webDriver.get('https://proyectzzzz.netlify.app/game')
            await webDriver.sleep(2000)
            const texto = await webDriver.findElement(By.css('#root > div.main-content > div > h2')).getText()
            assert.strictEqual(texto, "You must have a gamer nft for feel the power")

            await webDriver.get('https://proyectzzzz.netlify.app/Profile')
            await webDriver.sleep(2000)
            await webDriver.findElement(By.css("#root > div.total-profile-container > div.nav-profile-col > svg:nth-child(1)")).click()
            await webDriver.sleep(2000)
            await webDriver.findElement(By.css("#root > div.total-profile-container > div.profile-render-constant > div > div > div.user-header-container > div:nth-child(1) > div:nth-child(2)")).click()

        })
        it('Verificacion en la visualizacion de usuarios - Debe encontrar el numero exacto al numero de usuarios registrados en el sitio web', async () => {

            await webDriver.get('https://proyectzzzz.netlify.app/SignIn')
            await webDriver.sleep(2000)
            await webDriver.findElement(By.name('email')).sendKeys(credenciales.email)
            await webDriver.sleep(2000)
            await webDriver.findElement(By.name('password')).sendKeys(credenciales.password)
            await webDriver.sleep(2000)
            await webDriver.findElement(By.id('submit')).click()
            await webDriver.sleep(2000)
            await webDriver.get('https://proyectzzzz.netlify.app/Profile')
            await webDriver.sleep(2000)
            await webDriver.findElement(By.css("#root > div.total-profile-container > div.nav-profile-col > svg:nth-child(3)")).click()
            await webDriver.sleep(2000)
            const number = await webDriver.findElement(By.css('#root > div.total-profile-container > div.profile-render-constant > section > article > div.dashboard-resume > div.card-total-users > div > h2.card-amount')).getText()
            assert.strictEqual(Number(number), 23)
            webDriver.quit()
        })

    })

}


testing()