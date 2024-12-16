import fetch from 'node-fetch'

var handler = async (m, { text,  usedPrefix, command }) => {

if (!text) { return conn.reply(m.chat, `❀ Ingrese una petición para que Gemini lo responda.`, m)}
try {
await m.react(done)
var apii = await fetch(`https://apis-starlights-team.koyeb.app/starlight/gemini?text=${text}`)
var res = await apii.json()
await conn.reply(m.chat, res.result, m)
await m.react(done)
} catch {
await m.react(done)
await conn.reply(m.chat, `✘ Gemini no puede responder a esa pregunta.`, m, rcanal)
}}
handler.command = ['gemini']
handler.help = ['gemini']
handler.tags = ['ai']
handler.register = true 
handler.coin = 2
export default handler