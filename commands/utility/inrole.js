const Discord = require("discord.js"); //Setea el Discord

module.exports = { //Lo exporta a el bot.js con el message.js
  name: "inrole", //Nombre de comando
  cooldown: 5, //Tiempo para volver a usar el comando (en segundos)
  aliases: ["members", "rolemembers"], //Aliases para usarlo
  description: "This command shows a list of the users inside a role!", //Descripción del comando
  guildOnly: false, //Si solo se puede usar en servidores
  ownerOnly: false, //Si solo lo puedo usar yo
  nsfwOnly: false, //Si solo se puede usar en canales NSFW
  usage: "<role id/role mention/role name>", //Uso del comando (solo args)
  permissions: [], //Permisos necesarios para ejecutar el comando
  enabled: true, //Si está encendido
  exec: async (client, message, args) => { //Ejecutar con async para el await
    var lang = [];
    if (message.guild) lang = message.guild.language;
    if (!message.guild) lang = message.channel.language;
    var emcolor = [0];
    if (message.guild) emcolor = message.guild.me.displayHexColor;
    if (!message.guild) emcolor = client.config.colors.general;
    
        if (!args[0]) return message.channel.send("You must add some args!");//////If you do not mention or put a valid ID we make it return.
const role = message.guild.roles.cache.find(x => x.name === args.join(" ")) || message.guild.roles.cache.find(x => x.id == args[0]) || message.mentions.roles.first();

           if (!role) return message.channel.send("I couldn't find that role. Try searching it by id.");//////If you do not mention or put a valid ID we make it return.
       
    const mbr = role.members.filter((x) => x.user.tag !== message.guild.id).map((x) => `${x.user.tag}`)/////We filter the members with the role so that we know their tag :D

    const listaRoles = mbr.length > 50 ? `${mbr.slice(0, 50).join(', ')} and ${mbr.length - 50} more members` : mbr.join(', ');/////Now, with what we filter. If the members with the role are more than 15 it will say how many more members have the role. This to avoid future problems


    const embedInRole = new Discord.MessageEmbed()///////We create an embed (Optional)
        .setTitle(`Members with the role:\n\`${role.name}\` - \`${role.members.size}\``)//////A title that says the role and the number of members with the role
        .setDescription(listaRoles)///////Members with the role. Only 25 or less will come out.
        .setColor(emcolor)////The color of the emebd, this returns a hexadecimal color, if it has a color it will be #000000
        message.channel.send(embedInRole)////Send a embed.
  }
};
