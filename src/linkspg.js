

const puppeteer = require('puppeteer');

const urlalvo = "https://www.apostaganhabr.com/palpites-de-futebol/";

async function linkimoveis(lkpesquisa) {
    const dados = [];
    const browser = await puppeteer.launch({
        defaultViewport: null,
    });

    const page = await browser.newPage();
    await page.goto(lkpesquisa);

    const options = await page.$$eval('.wp-block-latest-posts__list > li > a', (opts) =>
        opts.map((option) => option.attributes[0].nodeValue)
    );

    await browser.close();

    await options.map((lnk) => {
        const olnk = lnk
        dados.push(olnk);
    });

    return linkimoveis;
}

linkimoveis(urlalvo);

export default linkimoveis;
