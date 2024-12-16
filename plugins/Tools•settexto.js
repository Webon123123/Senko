let handler = async (m, { conn, text, isRowner }) => {
  if (!text) return m.reply('✐ Por favor, proporciona un texto para el bot.\nEjemplo: settexto Yue-Bot');
  const texto1bot = ' • Powered By Team Ascend'
  global.textbot = `${text + texto1bot}`;
  
  m.reply(`✐ El nombre del bot ha sido cambiado a: ${global.textbot}`);
};

handler.help = ['settexto'];
handler.tags = ['tools'];
handler.command = ['settexto'];
handler.owner = true;

export default handler;