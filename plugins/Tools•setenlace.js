let handler = async (m, { conn, text, isRowner }) => {
  if (!text) return m.reply('✐ Por favor, proporciona un enlace para el bot.\nEjemplo: setenlace https://whatsapp.com/channel/0029Vak9Hmd1iUxdfDUdCK1w ');

  global.enlace = text.trim();
  
  m.reply(`✐ El nombre del bot ha sido cambiado a: ${global.enlace}`);
};

handler.help = ['setenlace'];
handler.tags = ['tools'];
handler.command = ['setenlace'];
handler.owner = true;

export default handler;