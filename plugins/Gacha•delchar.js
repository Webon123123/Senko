
import fs from 'fs';
import fetch from 'node-fetch';

const DATA_FILE = './data.json';
const CHARACTERS_URL = 'https://raw.githubusercontent.com/Webon123123/Senko/main/lib/characters.json';
const BOT_NAME = 'Senko-Bot';
const REPOSITORY_URL = 'git+https://github.com/Webon123123/Senko.git';

// Función para obtener datos locales
const obtenerDatos = () => {
    return fs.existsSync(DATA_FILE)
        ? JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))
        : { chats: {} };
};

// Función para guardar datos locales
const guardarDatos = (datos) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(datos, null, 2));
};

// Función para obtener personajes desde el servidor remoto
const obtenerPersonajes = async () => {
    try {
        const response = await fetch(CHARACTERS_URL);
        return await response.json();
    } catch (error) {
        console.error('Error al leer characters.json:', error);
        return [];
    }
};

// Verifica si la configuración del bot es correcta
const esSenkoBot = () => {
    try {
        const packageData = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
        return (
            packageData.name === BOT_NAME &&
            packageData.repository.url === REPOSITORY_URL
        );
    } catch (error) {
        return false;
    }
};

// Handler principal del comando
let handler = async (message, { conn, args }) => {
    if (!esSenkoBot()) {
        await conn.reply(message.chat, '☁️ Comando no disponible por el momento.', message);
        return;
    }

    if (args.length < 1) {
        conn.reply(message.chat, '💥 Debes especificar la waifu a eliminar.', message);
        return;
    }

    const waifuNombre = args.join(' ').toLowerCase().trim();
    const sender = message.sender;
    const chatID = message.chat;
    const datos = obtenerDatos();
    const personajes = await obtenerPersonajes();

    // Inicializar datos del chat si no existen
    if (!datos.chats[chatID]) {
        datos.chats[chatID] = { usuarios: {}, personajesReservados: [] };
    }

    const usuario = datos.chats[chatID].usuarios[sender];

    if (!usuario || usuario.characters.length === 0) {
        conn.reply(message.chat, '❤️‍🔥 No tienes waifus reclamadas.', message);
        return;
    }

    const waifuIndex = usuario.characters.findIndex(
        (waifu) => waifu.name.toLowerCase() === waifuNombre
    );

    if (waifuIndex === -1) {
        conn.reply(message.chat, `💥 ${waifuNombre} no está reclamado por ti.`, message);
        return;
    }

    const waifuData = personajes.find(
        (waifu) => waifu.name.toLowerCase() === waifuNombre
    );

    if (!waifuData) {
        conn.reply(message.chat, `💥 No se encontró la waifu ${waifuNombre}.`, message);
        return;
    }

    // Eliminar waifu del inventario del usuario
    usuario.characters.splice(waifuIndex, 1);
    usuario.characterCount--;
    usuario.totalRwcoins -= waifuData.value;

    // Guardar datos actualizados
    datos.chats[chatID].usuarios[sender] = usuario;
    guardarDatos(datos);

    // Confirmar eliminación
    conn.reply(
        message.chat,
        `❤️‍🔥 La waifu *${waifuData.name}* ha sido eliminada de tus obtenidos.`,
        message
    );
};

// Configuración del comando
handler.help = ['delchar <personaje>'];
handler.tags = ['gacha'];
handler.command = ['delchar', 'deletewaifu', 'delwaifu'];
handler.register = false;

export default handler;