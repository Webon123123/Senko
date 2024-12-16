import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─⭒ CONFIGURACIÓN GENERAL ─⭒─ׄ─ׅ─ׄ─*
global.botNumberCode = '+51969478611' // Número del bot
global.confirmCode = '' 

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─⭒ PROPIETARIOS ─⭒─ׄ─ׅ─ׄ─*
global.owner = [
  ['595976230899', 'Masha', true],
]
global.creadorbot = '595976230899' 

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─⭒ GRUPOS ─⭒─ׄ─ׅ─ׄ─*
global.mods = [] // Moderadores
global.prems = [] 

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─⭒ INFORMACIÓN DEL BOT ─⭒─ׄ─ׅ─ׄ─*
global.nameqr = 'Senko-Bot'
global.namebot = 'SenkoBot'
global.sessions = 'SenkoSession'
global.jadi = 'SenkoSanBot'
global.packname = '⪛✰ Senko - San ✰⪜'
global.botname = 'Senko'
global.wm = 'Senko - San'
global.author = 'Masha OFC'
global.dev = '© ⍴᥆ᥕᥱrᥱძ: Ascend Team'
global.textbot = 'Senko - San • Powered By Team Ascend'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─⭒ RECURSOS ─⭒─ׄ─ׅ─ׄ─*
global.banner = 'https://files.catbox.moe/swtqey.jpg'
global.catalogo = 'https://files.catbox.moe/rnky65.jpg'
global.enlace = 'https://whatsapp.com/channel/0029Vak9Hmd1iUxdfDUdCK1w'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─⭒ CANALES ─⭒─ׄ─ׅ─ׄ─*
global.channelid = '120363317643936931' 

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─⭒ LIBRERÍAS ─⭒─ׄ─ׅ─ׄ─*
global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment        

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─⭒ AJUSTES GENERALES ─⭒─ׄ─ׅ─ׄ─*
global.multiplier = 69 
global.maxwarn = '3' 

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─⭒ AUTOACTUALIZACIÓN ─⭒─ׄ─ׅ─ׄ─*
let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Actualización en 'settings.js'"))
  import(`${file}?update=${Date.now()}`)
})