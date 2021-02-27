const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "anal",
  cooldown: 5,
  aliases: ["analporn", "analsex"],
  description: "Ping!",
  guildOnly: true,
  ownerOnly: false,
  nsfwOnly: true,
  usage: "hola",
  permissions: [],
  enabled: true,
  exec: async (client, message, args) => {
    message.channel.startTyping()
    var lang = [];
    if (message.guild) lang = message.guild.language;
    if (!message.guild) lang = message.channel.language;

    var emcolor = [0];
    if (message.guild) emcolor = message.guild.me.displayHexColor;

    if (!message.guild) emcolor = client.config.colors.general;
    
    const { url } = await fetch("https://nekos.life/api/v2/img/anal")
      .then((res) => res.json());

    const embed = new Discord.MessageEmbed()
      .setTitle("Hentai Anal")
      .setImage(url)
      .setColor(emcolor)
      .setFooter(`Requested by: ${message.author.tag} | Displayed by nekos.life`);

    message.channel.send({ embed })

    message.channel.stopTyping()
  }
};
