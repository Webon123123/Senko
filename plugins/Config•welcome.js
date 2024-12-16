import {WAMessageStubType} from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, {conn, participants, groupMetadata}) {
  if (!m.messageStubType || !m.isGroup) return !0;
  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://qu.ax/QGAVS.jpg')
  let img = await (await fetch(`${pp}`)).buffer()
  let chat = global.db.data.chats[m.chat]

  let who = m.messageStubParameters[0] + '@s.whatsapp.net';
  let user = global.db.data.users[who];

  let userName = user ? user.name : await conn.getName(who);

  if (chat.welcome && m.messageStubType == 27) {
    let bienvenida = `❀ *Bienvenido* a ${groupMetadata.subject}\n ✰ @${m.messageStubParameters[0].split`@`[0]}\n${welcom1}\n •(=^●ω●^=)• Disfruta tu estadia en el grupo!\n> ✐ Puedes usar *!help* para ver la lista de comandos.`;

await conn.sendMini(m.chat, botname, dev, bienvenida, catalogo, catalogo, enlace, estilo)
  }

  if (chat.welcome && m.messageStubType == 32) {
    let bye = `❀ *Adiós* De ${groupMetadata.subject}\n ✰ @${m.messageStubParameters[0].split`@`[0]}\n${welcom2}\n\n •(=^●ω●^=)• Te esperamos pronto!\n> ✐ Puedes usar *#help* para ver la lista de comandos.`;
await conn.sendMini(m.chat, botname, dev, bye, catalogo, catalogo, estilo)
  }

  if (chat.welcome && m.messageStubType == 28) {
    let kick = `❀ *Adiós* De ${groupMetadata.subject}\n ✰ @${m.messageStubParameters[0].split`@`[0]}\n${welcom3}\n\n •(=^●ω●^=)• Fue echado del grupo!\n> ✐ Puedes usar *!help* para ver la lista de comandos.`;
await conn.sendMini(m.chat, packname, dev, kick, catalogo, catalogo, enlace, estilo)
}}