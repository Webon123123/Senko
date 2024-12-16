let handler = async (m, { conn, text, isRowner }) => {
  if (!text) return m.reply('✐ Por favor, proporciona un mensaje de eliminación para el bot.\nEjemplo: #seteliminada adios puto');

  global.welcom3 = text.trim();
  
  m.reply(`✐ El mensaje de eliminación del bot ha sido cambiado a: ${global.welcom3}`);
};

handler.help = ['seteliminada'];
handler.tags = ['tools'];
handler.command = ['seteliminada','setkick'];
handler.owner = true;

export default handler;