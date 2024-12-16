import fs from 'fs';

// Obtener datos de un archivo JSON
const obtenerDatos = () => {
    if (fs.existsSync('data.json')) {
        return JSON.parse(fs.readFileSync('data.json', 'utf-8'));
    }
    return { chats: {} };
};

// Verificar si el bot está configurado correctamente
const verificar = () => {
    try {
        const datos = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
        if (datos.name !== 'Senko-Bot') return false;
        if (datos.repository.url !== 'git+https://github.com/Webon123123/Senko.git') return false;
        return true;
    } catch {
        return false;
    }
};

// Obtener la lista de personajes desde un archivo
const personajes = fs.existsSync('./lib/characters.json')
    ? JSON.parse(fs.readFileSync('./lib/characters.json', 'utf-8'))
    : [];

// Contar el total de personajes
const contarTotalPersonajes = () => personajes.length;

// Configuración de paginación
const ITEMS_PER_PAGE = 10;

// Mostrar inventario de un usuario
const mostrarInventario = async (conn, mensaje, chatData, totalPersonajes, paginaActual) => {
    const sender = mensaje.sender;
    const { characters, totalRwcoins } = chatData.usuarios[sender] || { characters: [], totalRwcoins: 0 };
    const totalPersonajesUsuario = characters.length;
    const totalPaginas = Math.ceil(totalPersonajesUsuario / ITEMS_PER_PAGE);
    paginaActual = Math.max(1, Math.min(paginaActual, totalPaginas));

    const inicio = (paginaActual - 1) * ITEMS_PER_PAGE;
    const fin = inicio + ITEMS_PER_PAGE;
    const personajesPagina = characters.slice(inicio, fin);

    let personajesUsados = new Set();
    Object.values(chatData.usuarios).forEach(usuario => {
        usuario.characters.forEach(personaje => personajesUsados.add(personaje.name));
    });

    const personajesRestantes = personajes.filter(personaje => !personajesUsados.has(personaje.name));
    const totalRestantes = personajesRestantes.length;

    const mensajeInventario = `*╭╼*
│ 𝑻𝑼 𝑰𝑵𝑽𝑬𝑵𝑻𝑨𝑹𝑰𝑶!
│ Tus Personajes
⎆ ${totalPersonajesUsuario} en total.
⎆ Restantes: ${totalRestantes} de ${totalPersonajes}.
⎆ Porcentaje: ${(totalPersonajesUsuario / totalPersonajes * 100).toFixed(2)}%
│ Total de WFcoins: ${totalRwcoins}
*╰┅┄*

Tus Personajes:
${personajesPagina.map((personaje, index) => `⎆ ${inicio + index + 1}. ${personaje.name}`).join('\n')}

Página ${paginaActual} de ${totalPaginas}`;

    await conn.reply(mensaje.chat, mensajeInventario, mensaje);
};

// Manejador del comando
const handler = async (mensaje, { conn, command }) => {
    const chatID = mensaje.chat;
    const sender = mensaje.sender;

    let datos = obtenerDatos();
    if (!datos.chats[chatID]) {
        datos.chats[chatID] = { usuarios: {}, personajesReservados: [] };
    }
    const chatData = datos.chats[chatID];

    if (!verificar()) {
        await conn.reply(mensaje.chat, 'Error: Configuración inválida.', mensaje);
        return;
    }

    if (!chatData.usuarios[sender] || chatData.usuarios[sender].characters.length === 0) {
        await conn.reply(mensaje.chat, 'No tienes ningún objeto en tu inventario 😹🫵!', mensaje);
        return;
    }

    const totalPersonajes = contarTotalPersonajes();
    const totalPersonajesUsuario = chatData.usuarios[sender].characters.length;
    const totalPaginas = Math.ceil(totalPersonajesUsuario / ITEMS_PER_PAGE);

    conn.session = conn.session || {};
    conn.session[chatID] = conn.session[chatID] || {};
    conn.session[chatID].currentPage = conn.session[chatID].currentPage || 1;

    let paginaActual = conn.session[chatID].currentPage;

    if (command === 'next' || command === 'siguiente') {
        paginaActual = Math.min(paginaActual + 1, totalPaginas);
    } else if (command === 'prev' || command === 'anterior') {
        paginaActual = Math.max(paginaActual - 1, 1);
    }

    conn.session[chatID].currentPage = paginaActual;

    await mostrarInventario(conn, mensaje, chatData, totalPersonajes, paginaActual);
};

handler.help = ['rollwaifu'];
handler.tags = ['waifu'];
handler.command = ['rollwaifu', 'next', 'siguiente', 'prev', 'anterior'];

export default handler;