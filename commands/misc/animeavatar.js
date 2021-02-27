const Discord = require("discord.js"); //Setea el Discord
const fetch = require("node-fetch");

module.exports = {
  //Lo exporta a el bot.js con el message.js
  name: "animeavatar", //Nombre de comando
  cooldown: 5, //Tiempo para volver a usar el comando (en segundos)
  aliases: ["animepfp", "randompfp", "a-avatar"], //Aliases para usarlo
  description: "You can get a random anime avatar! Note: You will get NSFW pictures if you are at NSFW channel.", //Descripción del comando
  guildOnly: false, //Si solo se puede usar en servidores
  ownerOnly: false, //Si solo lo puedo usar yo
  nsfwOnly: false, //Si solo se puede usar en canales NSFW
  usage: "", //Uso del comando (solo args)
  permissions: [], //Permisos necesarios para ejecutar el comando
  enabled: true, //Si está encendido
  exec: async (client, message, args) => {
    //Ejecutar con async para el await
    message.channel.startTyping();
    var lang = [];
    if (message.guild) lang = message.guild.language;
    if (!message.guild) lang = message.channel.language;
    var emcolor = [0];
    if (message.guild) emcolor = message.guild.me.displayHexColor;
    if (!message.guild) emcolor = client.config.colors.general;

    const { url } = await fetch(
      `https://nekos.life/api/v2/img/${
        message.channel.nsfw ? "nsfw_" : ""
      }avatar`
    ).then(res => res.json());

    const embed = new Discord.MessageEmbed()
      .setTitle(`${message.channel.nsfw ? "NSFW " : ""}Anime Avatar`)
      .setImage(url)
      .setFooter(
        `Requested by: ${message.author.tag} | Powered by nekos.life`,
        message.author.displayAvatarURL({ size: 32 })
      )
      .setColor(emcolor);
    return message.channel.send({ embed })
      
      .then(message.channel.stopTyping());
  }
};
