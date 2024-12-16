import yts from 'yt-search'

var handler = async (m, { text, conn, args, command, usedPrefix }) => {

if (!text) return conn.reply(m.chat, `✐ *Escriba el título de algún vídeo de Youtube*\n\nEjemplo, ${usedPrefix + command} Yue Arifureta`, m)

conn.reply(m.chat, wait, m, {
contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, showAdAttribution: true,
title: botname,
body: dev,
previewType: 0, thumbnail: catalogo,
sourceUrl: enlace }}})

let results = await yts(text)
let tes = results.all
let teks = results.all.map(v => {
switch (v.type) {
let imgUrl = `https://random-apis.shop/generate-card?titulo=${v.title}&autor=${v.ago}&thumbnail=${tes[0].thumbnail}&tempo=${v.timestamp}`;
case 'video': return `✐ *Título:* 
» ${v.title}

🜸 *Enlace:* 
» ${v.url}

🜸 *Duración:*
» ${v.timestamp}

🜸 *Subido:* 
» ${v.ago}

🜸 *Vistas:* 
» ${v.views}`}}).filter(v => v).join('\n\n••••••••••••••••••••••••••••••••••••\n\n')

conn.sendFile(m.chat, imgUrl, 'yts.jpeg', teks, fkontak, m)

}
handler.help = ['ytsearch']
handler.tags = ['buscador']
handler.command = ['playlist', 'ytbuscar', 'yts', 'ytsearch']

handler.register = false
handler.coin = 1

export default handler
