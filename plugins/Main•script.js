import moment from 'moment-timezone'
import fetch from 'node-fetch'

let handler = async (m, { conn, args }) => {
try {
let res = await fetch('https://api.github.com/repos/Webon123112/Senko')

if (!res.ok) throw new Error('Error al obtener datos del repositorio')
let json = await res.json()

let txt = `*✐  S C R I P T  -  M A I N*\n\n`
txt += `✰  *Nombre* : ${json.name}\n`
txt += `✰  *Visitas* : ${json.watchers_count}\n`
txt += `✰  *Peso* : ${(json.size / 1024).toFixed(2)} MB\n`
txt += `✰  *Actualizado* : ${moment(json.updated_at).format('DD/MM/YY - HH:mm:ss')}\n`
txt += `✰  *Url* : ${json.html_url}\n`
txt += `✰  *Forks* : ${json.forks_count}\n`
txt += `✰  *Stars* : ${json.stargazers_count}\n\n`
txt += `🜸 *${dev}*`

await conn.sendFile(m.chat, catalogo, 'yotsuba.jpg', txt, estilo, true, {
contextInfo: {
'forwardingScore': 200,
'isForwarded': false,
externalAdReply: {
showAdAttribution: true,
renderLargerThumbnail: false,
title: `✐ Script ${botname}`,
body: `🜸 ${dev}`,
mediaType: 1,
sourceUrl: enlace,
thumbnailUrl: catalogo 
}}
}, { mentions: m.sender })
} catch {
await conn.reply(m.chat, '✐ *Ocurrió un error.*', m)
await m.react(error)
}}

handler.help = ['script']
handler.tags = ['main']
handler.command = ['script', 'sc']
handler.register = true

export default handler