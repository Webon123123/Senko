

import fs from 'fs';


const obtenerDatos = () => {
  return fs.existsSync("data.json")
    ? JSON.parse(fs.readFileSync("data.json", "utf-8"))
    : { chats: {} };
};


const obtenerPersonajes = () => {
  return fs.existsSync("./lib/characters.json")
    ? JSON.parse(fs.readFileSync("./lib/characters.json", "utf-8"))
    : [];
};


const verifi = () => {
  try {
    const packageData = JSON.parse(fs.readFileSync("./package.json", "utf-8"));
    if (packageData.name !== "Senko-Bot") return false;
    if (packageData.repository.url !== "git+https://github.com/Webon123123/Senko.git") return false;
    return true;
  } catch (e) {
    return false;
  }
};


let handler = async (message, { conn, text }) => {
  if (!text) {
    await conn.reply(
      message.chat,
      "𝑷𝒐𝒓\x20𝒇𝒂𝒗𝒐𝒓,\x20𝒑𝒓𝒐𝒑𝒐𝒓𝒄𝒊𝒐𝒏𝒂\x20𝒆𝒍\x20𝒏𝒐𝒎𝒃𝒓𝒆\x20𝒅𝒆𝒍\x20𝒑𝒆𝒓𝒔𝒐𝒏𝒂𝒋𝒆\x20𝒒𝒖𝒆\x20𝒅𝒆𝒔𝒆𝒂𝒔\x20𝒗𝒆𝒓.\x20𝑬𝒋𝒆𝒎𝒑𝒍𝒐:\x20.𝒄𝒉𝒂𝒓𝒂𝒄𝒕𝒆𝒓\x20𝑴𝒆𝒈𝒖𝒎𝒊𝒏",
      message
    );
    return;
  }

  if (!verifi()) {
    await conn.reply(
      message.chat,
      "𝑬𝒔𝒕𝒆\x20𝒄𝒐𝒎𝒂𝒏𝒅𝒐\x20𝒔𝒐𝒍𝒐\x20𝒆𝒔𝒕𝒂\x20𝒅𝒊𝒔𝒑𝒐𝒏𝒊𝒃𝒍𝒆\x20𝒑𝒂𝒓𝒂\x20Senko-𝑩𝒐𝒕-𝑴𝑫.\x0a\x20🔥\x20https://github.com/Webon123123/Senko",
      message
    );
    return;
  }

  const sender = message.sender;
  const chatId = message.chat;
  const characterName = text.trim().toLowerCase();
  const data = obtenerDatos();
  const characters = obtenerPersonajes();

  
  if (
    !data.chats[chatId] ||
    !data.chats[chatId].usuarios[sender] ||
    !data.chats[chatId].usuarios[sender].personajes.some(
      (p) => p.name.toLowerCase() === characterName
    )
  ) {
    await conn.reply(
      chatId,
      `𝑵𝒐\x20𝒕𝒊𝒆𝒏𝒆𝒔\x20𝒆𝒍\x20𝒑𝒆𝒓𝒔𝒐𝒏𝒂𝒋𝒆\x20*${characterName}*\x20𝒆𝒏\x20𝒕𝒖\x20𝒊𝒏𝒗𝒆𝒏𝒕𝒂𝒓𝒊𝒐.`,
      message
    );
    return;
  }

  const character = data.chats[chatId].usuarios[sender].personajes.find(
    (p) => p.name.toLowerCase() === characterName
  );

  if (!character) {
    await conn.reply(
      chatId,
      `𝑵𝒐\x20𝒔𝒆\x20𝒆𝒏𝒄𝒐𝒏𝒕𝒓𝒐\x20𝒊𝒏𝒇𝒐𝒓𝒎𝒂𝒄𝒊𝒐𝒏\x20𝒑𝒂𝒓𝒂\x20𝒆𝒍\x20𝒑𝒆𝒓𝒔𝒐𝒏𝒂𝒋𝒆\x20${characterName}.`,
      message
    );
    return;
  }

  const caption = `𝑬𝒔𝒕𝒆\x20𝒆𝒔\x20𝒕𝒖\x20𝒑𝒆𝒓𝒔𝒐𝒏𝒂𝒋𝒆.\x0a\x20*${character.name}*\x0a𝑺𝒖\x20𝒗𝒂𝒍𝒐𝒓\x20𝒆𝒔:\x20${character.value}\x20𝑹𝑾𝒄𝒐𝒊𝒏𝒔.`;

  await conn.sendMessage(chatId, {
    image: { url: character.url },
    caption,
    mimetype: "image/jpeg",
  });
};


handler.command = ["character"];
handler.tags = ["rollwaifu"];
handler.help = ["character"];
handler.register = false;

export default handler;