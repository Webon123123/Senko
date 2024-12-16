let handler = async (m, { conn, text, command }) => {
let id = text ? text : m.chat  
let chat = global.db.data.chats[m.chat]
chat.welcome = false
await conn.reply(id, `《✧》 *${botname}* Abandona El Grupo, Fué Genial Estar Aquí`  m) 
await conn.groupLeave(id)
try {  
chat.welcome = true
} catch (e) {
await m.reply(`${botname}`) 
return console.log(e)
}}
handler.command = ['leave', 'leavegc', 'salir']
handler.group = true
handler.owner = true
export default handler
