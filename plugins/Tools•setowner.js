let handler = async (m, { conn, text, isRowner }) => {
    let amount = text.trim();
    if (!/^\d+$/.test(amount)) {
        return conn.reply(m.chat, '✐ Solo se permiten números.', m);
    }

    amount = parseInt(amount);
    global.creadorbot = amount;
    m.reply(`✐ El creador del bot ha sido cambiado a: ${global.creadorbot}`);
};

handler.help = ['setcreador'];
handler.tags = ['tools'];
handler.command = ['setcreador'];
handler.owner = true;

export default handler;