const axios = require('axios');
const cheerio = require('cheerio');
const { log } = require('console');
const fs = require('fs');
const path = require('path');

const sitealvo = 'https://mangakakalot.com/';

let array = []
const dados = [];

const dadosBrutos = async () =>{
    try {
        const res = await axios.get(sitealvo);
        // console.log(res.data);
        return res.data
    } catch (error) {
        console.log('Deu pau ao extrair dados brutos' + error);
            }
};


const listalinks = async () =>{
    const html = await dadosBrutos();
    const $ = await cheerio.load(html);
    $('.doreamon > div > a').each(function(i,lnk){
        dados[i] = $(lnk).attr('href');
    });

    // console.log(dados)
    return dados;
};
// const lnkfilho = 'https://mangakakalot.com/read-rp0mf158504906871'

const coletadados = async (pg) =>{
    try {
        const res = await axios.get(pg);
        const html = res.data;
        const $ = await cheerio.load(html);

        let dadosMangas = {}
        $('.manga-info-text > li').each((i, e) =>{
            if (e && e.tagName == 'li'){
                dadosMangas.push($(e).text())
            
            // startsWith = começa com 
            // if (test.startsWith('Genres :')){
            //     dadosMangas.generos = $(e).text();
            //     return
            //     }
            }
        })
        // let autor = $('.manga-info-text > li:nth-child(2) > a:nth-child(1)').text();
        // let dataUltimaAtualizacao = $('.manga-info-text > li:nth-child(4)').text();
        let genero = $('.manga-info-pic > img').attr('src');

    
        var resultado = {dadosMangas, genero}

        array.push(resultado)

        // let date = new Date();
        // let updown = dadosManga[1].perubahan.includes('-') ? `penurunan sebesar ${dadosManga[1].perubahan}` : `kenaikan sebesar ${dadosManga[1].perubahan}`;
        // let message = `Harga emas pada hari ini ${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} adalah ${dadosManga[0].harga_terakhir}, terjadi ${updown}, so were building this with node js`;
        // tele.sendNotif(message)

    //     let data = JSON.stringify(resultado)
    // fs.writeFileSync(path.join(__dirname, '../db.json', data))
    // console.log('data')
    // console.log(resultado)

    gravahtml(array)
    

    } catch (error) {
        console.log('deu problema na extração de dados' + error);
    }
}



const gravahtml = async (result) => {
    let data = JSON.stringify(result)
    console.log(data)
    fs.writeFileSync('../db.json', data, function(err) {
        if(err) {
            console.log('Deu pau na geração de html' + err);
        }
    })
}

const apresentadados = async () =>{
    const todoslnks = await listalinks();
    todoslnks.map(function(linksfillhos){
        coletadados(linksfillhos)
    })
};

const main = async () =>{
    await apresentadados();
};

main();

