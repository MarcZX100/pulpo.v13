const guildModel = require("/app/models/guildModel");
const Discord = require("discord.js"); //Setea el Discord

module.exports = { //Lo exporta a el bot.js con el message.js
  name: "prefix", //Nombre de comando
  cooldown: 5, //Tiempo para volver a usar el comando (en segundos)
  aliases: ["setprefix", "svprefix"], //Aliases para usarlo
  description: "Use this command for setting a personalized prefix for this server. The max length of the prefix is 7 characters!", //Descripción del comando
  guildOnly: true, //Si solo se puede usar en servidores
  ownerOnly: false, //Si solo lo puedo usar yo
  nsfwOnly: false, //Si solo se puede usar en canales NSFW
  usage: "<new prefix>", //Uso del comando (solo args)
  permissions: ["ADMINISTRATOR"], //Permisos necesarios para ejecutar el comando
  enabled: true, //Si está encendido
  exec: async (client, message, args) => { //Ejecutar con async para el await
    var lang = [];
    if (message.guild) lang = message.guild.language;
    if (!message.guild) lang = message.channel.language;

          let guildDocument = await guildModel.findOne({
        guildID: message.guild.id
      });
    
       let prefix = !guildDocument.prefix ? client.config.prefixes[0] : guildDocument.prefix;
    
    let newPrefix = args.join(' ');
    if(!newPrefix.length) {
        let embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription('My prefix for this guild is `' + prefix + '`')
        return message.channel.send(embed);
    }

    if(newPrefix.length > 7) {
        let embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription('Prefix shouldn\'t be longer than 7 characters. Yours has ' + newPrefix.length + '.')
        return message.channel.send(embed);
    }

   guildDocument.prefix = newPrefix;
    await guildDocument.save();

    let embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setDescription('Prefix changed to `' + newPrefix + '`. If you ever forget it just tag me.')
    return message.channel.send(embed);

  }
};
