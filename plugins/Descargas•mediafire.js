import axios from 'axios'
import fetch from 'node-fetch'
import cheerio from 'cheerio'
let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) throw m.reply(`✐ Ingrese un enlace de mediafire.\n*Ejemplo:* ${usedPrefix}mediafire https://www.mediafire.com/file/nb63btgjr0dsn4z/COMDELIGHT_v1.1.apk/file`)
try {  
let res = await mediafireDl(args[0])
let { name, size, date, mime, link } = res
let caption = `✐ *Nombre:* ${name}
🜸 *Peso:* ${size}
🜸 *Tipo:* ${mime}`.trim()
conn.reply(m.chat, caption, m, {
contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: botname, body: textbot, previewType: 0, thumbnail: banner, sourceUrl: enlace}}})
await conn.sendFile(m.chat, link, name, '', m, null, { mimetype: mime, asDocument: true })
} catch (e) {
await conn.reply(m.chat, `✐ Error, pruebe nuevamente con ${usedPrefix + command}`)
console.log(e)
handler.coin = 3 
}}
handler.help = ['mediafire'].map(v => v + ' <url>')
handler.tags = ['descargas']
handler.command = /^(mediafire|mdfire|mf)$/i
handler.register = false
handler.coin = 10
export default handler

async function mediafireDl(url) {
const res = await axios.get(`https://www-mediafire-com.translate.goog/${url.replace('https://www.mediafire.com/','')}?_x_tr_sl=en&_x_tr_tl=fr&_x_tr_hl=en&_x_tr_pto=wapp`)
const $ = cheerio.load(res.data)
const link = $('#downloadButton').attr('href')
const name = $('body > main > div.content > div.center > div > div.dl-btn-cont > div.dl-btn-labelWrap > div.promoDownloadName.notranslate > div').attr('title').replaceAll(' ','').replaceAll('\n','')
const date = $('body > main > div.content > div.center > div > div.dl-info > ul > li:nth-child(2) > span').text()
const size = $('#downloadButton').text().replace('Download', '').replace('(', '').replace(')', '').replace('\n', '').replace('\n', '').replace('                         ', '').replaceAll(' ','')
let mime = ''
let rese = await axios.head(link)
mime = rese.headers['content-type']
return { name, size, date, mime, link }
}