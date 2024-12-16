import fs from "fs";
import { v4 as uuid } from "uuid";

const completadoImage = "./src/completado.jpg";


const obtenerDatos = () => {
  try {
    return fs.existsSync("data.json")
      ? JSON.parse(fs.readFileSync("data.json", "utf-8"))
      : {
          usuarios: {},
          personajesReservados: [],
        };
  } catch (e) {
    console.error("✿ Error al leer data.json:", e);
    return {
      usuarios: {},
      personajesReservados: [],
    };
  }
};


const guardarDatos = (data) => {
  try {
    fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
  } catch (e) {
    console.error("✿ Error al escribir en data.json:", e);
  }
};

const reservarPersonaje = (userId, personaje) => {
  const datos = obtenerDatos();
  datos.personajesReservados.push({
    userId,
    ...personaje,
  });
  guardarDatos(datos);
};


const obtenerPersonajes = () => {
  try {
    return JSON.parse(fs.readFileSync("./lib/characters.json", "utf-8"));
  } catch (e) {
    console.error("✿ Error al leer characters.json:", e);
    return [];
  }
};


const cooldowns = {};

const handler = async (message, { conn }) => {
  try {
    const sender = message.sender;
    const currentTime = new Date().getTime();
    const cooldownTime = currentTime - (cooldowns[sender] || 0);

    if (cooldownTime < 600000) {
      const remainingTime = 600000 - cooldownTime;
      const minutes = Math.floor(remainingTime / 60000);
      const seconds = Math.floor((remainingTime % 60000) / 1000);

      const cooldownMessage = `《✿》Debes esperar *${minutes} minutos ${seconds} segundos* para usar *#rw* de nuevo.`;
      await conn.sendMessage(message.chat, { text: cooldownMessage });
    } else {
      const datos = obtenerDatos();
      const personajes = obtenerPersonajes();

      const personajesDisponibles = personajes.filter((personaje) => {
        return !Object.values(datos.usuarios).some((usuario) =>
          usuario.personajesReservados.includes(personaje.url)
        );
      });

      if (personajesDisponibles.length === 0) {
        await conn.sendMessage(message.chat, {
          image: { url: completadoImage },
          caption:
            "《✿》Felicidades, todos los personajes han sido obtenidos. ¡Pronto habrá más waifus para recolectar!",
        });
      } else {
        const personajeAleatorio =
          personajesDisponibles[
            Math.floor(Math.random() * personajesDisponibles.length)
          ];
        const nuevoId = uuid();

        reservarPersonaje(sender, { ...personajeAleatorio, id: nuevoId });

        const mensaje =
          `•・。.・゜✭・.・✫・゜・。.\n` +
          `│ ❀ Felicidades\n` +
          `│✿ Por el Nuevo Personaje\n` +
          `꒷︶꒷꒥꒷‧₊˚૮꒰˵•ᵜ•˵꒱ა‧₊˚꒷︶꒷꒥꒷\n\n` +
          `✰ Nombre:\n> » *${personajeAleatorio.name}*\n` +
          `✰ Valor:\n> » *${personajeAleatorio.value}*\n` +
          `✰ Estado:\n> » Estado: Libre\n\n` +
          `*✰ Identificación:*\n<id:${nuevoId}>`;

        await conn.sendMessage(message.chat, {
          image: { url: personajeAleatorio.url },
          caption: mensaje,
          mimetype: "image/jpeg",
        });

        cooldowns[sender] = currentTime;
      }
    }
  } catch (e) {
    console.error("Error:", e);
    await conn.sendMessage(message.chat, {
      text: "《✿》Ocurrió un error al procesar tu solicitud. Intenta de nuevo más tarde.",
    });
  }
};
handler.register = false
handler.command = ["roll", "rw"];
export default handler;