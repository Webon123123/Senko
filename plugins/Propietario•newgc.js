let handler = async (m, { conn, text }) => {
if (!text) return m.reply('✐ Ingresa un nombre para el grupo.')
try{
m.reply('✐ *Creando grupo*')
let group = await conn.groupCreate(text, [m.sender])
let link = await conn.groupInviteCode(group.gid)
m.reply('✐ Grupo creado con éxito \n> » https://chat.whatsapp.com/' + url)
} catch (e) {
m.reply(`✐ Ocurrió un error.`)
}
}
handler.help = ['grupocrear <nombre>']
handler.tags = ['owner']
handler.command = ['creargc', 'newgc', 'creargrupo', 'grupocrear']
handler.owner = true
handler.register = true
export default handler
