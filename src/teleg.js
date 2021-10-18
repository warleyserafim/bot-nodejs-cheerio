const TelegramBot = require('node-telegram-bot-api')
const https = require('https')

const token = '1850273882:AAEso2SaiPvJWgKDv7m-T7HXDLyxgTYVuRA'; // your bot telegram token
const chatid = '1462977582' // your chat id, you can get it on line 34
const fs = require('fs')
const path = require('path')



const bot = new TelegramBot(token, { polling: true })

const raven = () => {

    bot.onText(/\/cek/, (msg) => {
        console.log('msg', msg)
        let dadosManga = [];
        const chatId = msg.chat.id;
        fs.readFile(path.join(__dirname, '../db.json'), (err, data) => {
            console.log('err', err)
            console.log('data', data)
            if (err) throw err
            let a = JSON.parse(data)
            dadosManga = a;

            for (let i = 0; i < dadosManga.length; i++) {

            if (dadosManga[i].dadosMangas != "") {
              var message = `${dadosManga[i].dadosMangas}`
              bot.sendPhoto(chatId,dadosManga[i].genero)
              bot.sendMessage(chatId, message)
                }
            }
            // send message
            
        })
    })

    // bot.onText(/\/naikatauturun/, (msg) => {
    //     let dadosManga = [];
    //     const chatId = msg.chat.id;
    //     fs.readFile(path.join(__dirname, '../db.json'), (err, data) => {
    //         if (err) throw err;
    //         let student = JSON.parse(data);
    //         dadosManga = student;
    //         let harga = dadosManga[1].perubahan.includes('-') ? `Turun ${dadosManga[1].perubahan}` : `Naik ${dadosManga[1].perubahan}`;
    //         // send a message to the chat acknowledging receipt of their message
    //         bot.sendMessage(chatId, `${harga} dari harga sebelumnya.`);
    //     });

    // });
}

const sendNotif = (msg) => {
    const target = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatid}&text=${msg}`
    https.get(target, (res) => {
        console.log('notif telegram sent')
    })
}

module.exports = { raven, sendNotif }