

const puppeteer = require('puppeteer');

const urlalvo = 'https://www.apostaganhabr.com/flamengo-vs-athletico-pr/'

let detalhesImovel = [];

const wspg = async () => {

    const browser = await puppeteer.launch({
        headless: true,
    });

    const page = await browser.newPage();

    await page.goto(urlalvo);
    await page.waitForTimeout(3000);
    const dadosManganome = await page.$eval('.space-title-box-h1 > h1:nth-child(1)', (el) => el.textContent);
    const palpite = await page.$eval('.space-page-content-box-wrap > div:nth-child(1) > table:nth-child(24) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > p:nth-child(1) > strong:nth-child(1)', (el) => el.textContent);
    // const valor = 

    const resultado = {dadosManga};

    console.log(resultado)
await browser.close
};

wspg();

