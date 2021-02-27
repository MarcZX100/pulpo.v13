const Discord = require("discord.js"); //Setea el Discord
const nekoclient = require('nekos.life');
const neko = new nekoclient();

module.exports = { //Lo exporta a el bot.js con el message.js
  name: "yuri", //Nombre de comando
  cooldown: 5, //Tiempo para volver a usar el comando (en segundos)
  aliases: ["hlesbian"], //Aliases para usarlo
  description: "A NSFW command which returns lesbic hentai!", //Descripción del comando
  guildOnly: false, //Si solo se puede usar en servidores
  ownerOnly: false, //Si solo lo puedo usar yo
  nsfwOnly: true, //Si solo se puede usar en canales NSFW
  usage: "", //Uso del comando (solo args)
  permissions: [], //Permisos necesarios para ejecutar el comando
  enabled: true, //Si está encendido
  exec: async (client, message, args) => { //Ejecutar con async para el await
    message.channel.startTyping()
    var lang = [];
    if (message.guild) lang = message.guild.language;
    if (!message.guild) lang = message.channel.language;
    var emcolor = [0];
    if (message.guild) emcolor = message.guild.me.displayHexColor;
    if (!message.guild) emcolor = client.config.colors.general;
    
            const GIF = await neko.nsfw.yuri();
            const embed = new Discord.MessageEmbed()
            .setColor(emcolor)
            .setTitle(`Yuri`)
            .setImage(GIF.url)
            .setFooter(`Requested by: ${message.author.tag} | Displayed by nekos.life`);
            message.channel.send(embed)
            
    
    .then(message.channel.stopTyping())
  }
};
