const handler = async (m, {conn, text}) => {

if (!text) return await conn.reply(m.chat, `✐ Y el mensaje que quieres compartir al canal?`, m)

try {
await m.react('⏱️')

await conn.reply(m.chat, `✐ El texto se envió correctamente al canal.`, m)
await conn.reply(global.channelid, text, m)
await m.react('✅')

} catch {
await conn.reply(m.chat, `✐ No se pudo enviar el mensaje al canal.`, m)
await m.react('✖️')}}

handler.command = ['enviarmsg', 'enviarmsgcanal', 'enviarmsgchannel']
handler.owner = true
export default handler