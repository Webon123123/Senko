import { sticker } from '../lib/sticker.js'
//import uploadFile from '../lib/uploadFile.js'
//import uploadImage from '../lib/uploadImage.js'
//import { webp2png } from '../lib/webp2mp4.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
const names1 = conn.getName(m.sender)
global.wms1 = `♾━━━━━━━━\n├ ${botname}\n├ ${creadorbot}\n├ ${names1}\n├ ${moment.tz('America/Los_Angeles').format('DD/MM/YY')}\n├ ${moment.tz('America/Los_Angeles').format('HH:mm:ss')} \n♾━━━━━━━━`
global.wms2 = `♾ ━━━━━━━━\n├ ɓσƭ:\n├ ρяοριєταяιο:\n├ цรєя:\n├ ƒєϲнα ∂є ϲяєαϲιόи:\n├ нοяα:\n♾━━━━━━━━`
let stiker = false
try {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || q.mediaType || ''
if (/webp|image|video/g.test(mime)) {
if (/video/g.test(mime)) if ((q.msg || q).seconds > 10) return m.reply(`✐ *¡El video no puede durar mas de 9 segundos!*`)
let img = await q.download?.()

if (!img) return conn.reply(m.chat, `✐ *_La conversión ha fallado, intenta enviar primero imagen/video/gif y luego responde con el comando._*`, m)

let out
try {
stiker = await sticker(img, false, global.wms2, global.wms1)
} catch (e) {
console.error(e)
} finally {
if (!stiker) {
if (/webp/g.test(mime)) out = await webp2png(img)
else if (/image/g.test(mime)) out = await uploadImage(img)
else if (/video/g.test(mime)) out = await uploadFile(img)
if (typeof out !== 'string') out = await uploadImage(img)
stiker = await sticker(false, out, global.wms2, global.wms1)
}}
} else if (args[0]) {
if (isUrl(args[0])) stiker = await sticker(false, args[0], global.wms2, global.wms1)

else return m.reply(`✐ El url es incorrecto`)

}
} catch (e) {
console.error(e)
if (!stiker) stiker = e
} finally {
if (stiker) conn.sendFile(m.chat, stiker, 'sticker.webp', '',m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: false, title: botname, body: dev, mediaType: 2, sourceUrl: enlace, thumbnail: catalogo}}}, { quoted: m })

else return conn.reply(m.chat, `✐ ${names1} *_La conversión ha fallado, intenta enviar primero imagen/video/gif y luego responde con el comando._*`, m)


}}
handler.help = ['stiker <img>', 'sticker <url>']
handler.tags = ['sticker']
handler.register = false
handler.command = ['s', 'sticker', 'stiker']

export default handler

const isUrl = (text) => {
return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))}