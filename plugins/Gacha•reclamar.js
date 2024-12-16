
import fs from 'fs';

let cooldowns = {};

const obtenerDatos = () => {
  return fs.existsSync('./package.json')
    ? JSON.parse(fs.readFileSync('./package.json', 'utf-8'))
    : { 'usuarios': {}, 'personajesReservados': [] };
};

const guardarDatos = (data) => {
  fs.writeFileSync('./package.json', JSON.stringify(data, null, 2));
};

const verificarBot = () => {
  try {
    const data = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
    if (data.name !== 'Senko') return false;
    if (data.repository.url !== 'git+https://github.com/Webon123123/Senko.git') return false;
    return true;
  } catch (error) {
    console.error('Error al leer package.json:', error);
    return false;
  }
};

let handler = async (message, { conn }) => {
  if (!message.command) return;

  if (!verificarBot()) {
    await conn.sendMessage(message.chat, '✧ Error al verificar el bot.', message);
    return;
  }

  let senderId = message.sender;
  let user = await conn.getName(senderId);
  let matchId = message.command.match(/<id:(.*)>/)?.[1];
  let data = obtenerDatos();

  if (!matchId) return;

  let character = data.personajesReservados.find(char => char.id === matchId);
  let currentTime = new Date().getTime();
  let cooldownTime = 10 * 60 * 1000;
  let lastUsedTime = cooldowns[senderId] || 0;

  if (currentTime - lastUsedTime < cooldownTime) {
    let remainingTime = cooldownTime - (currentTime - lastUsedTime);
    let minutes = Math.floor(remainingTime / 60000);
    let seconds = Math.floor((remainingTime % 60000) / 1000);
    await conn.reply(message.chat, `✧ Debes esperar ${minutes} minutos ${seconds} segundos para usar el comando nuevamente.`, message);
    return;
  }

  if (!character) {
    await conn.sendMessage(message.chat, '✧ El personaje no está disponible por el momento.', message);
    return;
  }

  let characterOwner = data.usuarios[character.userId];
  let isOwner = characterOwner && characterOwner.name === senderId;

  if (isOwner) {
    await conn.sendMessage(message.chat, `✧ Ya tienes el personaje ${character.name}!`, message);
    return;
  }

  let newCharacterData = {
    'name': character.name,
    'url': character.url,
    'value': character.value
  };

  data.usuarios[senderId] = data.usuarios[senderId] || { characters: [], characterCount: 0, totalRwcoins: 0 };
  data.usuarios[senderId].characters.push(newCharacterData);
  data.usuarios[senderId].characterCount++;

  data.personajesReservados = data.personajesReservados.filter(char => char.id !== matchId);
  guardarDatos(data);

  await conn.sendMessage(message.chat, `✧ *${character.name}* ha sido reclamado por @${senderId}!`, message);

  cooldowns[senderId] = currentTime;
};

handler.command = ['c'];
handler.help = ['c'];
handler.customPrefix = ['c', 'c!'];
handler.priority = true;
handler.registee = false;
export default handler;