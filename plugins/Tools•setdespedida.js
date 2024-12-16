let handler = async (m, { conn, text, isRowner }) => {
  if (!text) return m.reply('✐ Por favor, proporciona un mensaje de despedida para el bot.\nEjemplo: #setdespedida adios user');

  global.welcom2 = text.trim();
  
  m.reply(`✐ La despedida del bot ha sido cambiado a: ${global.welcom2}`);
};

handler.help = ['setdespedida'];
handler.tags = ['tools'];
handler.command = ['setdespedida','setbye'];
handler.owner = true;

export default handler;