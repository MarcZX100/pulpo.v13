const Discord = require("discord.js")

module.exports = {
  name: "ping",
  cooldown: 0,
  aliases: ["uptime"],
  description: "Ping!",
  permissions: [],
  guildOnly: false,
  enabled: true,
  exec: async (client, message, args) => {
 
            var emcolor = [0]
    if (message.guild) emcolor = message.guild.me.displayHexColor
      
    if (!message.guild) emcolor = client.config.colors.general
    
    const embed = new Discord.MessageEmbed()
    
  .setColor(emcolor)
   message.channel.send("Checking the ping...").then(botMsg => {
    embed.setTitle("Ping Results")
    .setColor(emcolor)
    .addField("API", `${botMsg.createdAt - message.createdAt}ms`)
    .addField("BOT", `${Math.round(message.client.ws.ping)}ms`)
    
     botMsg.edit({ embed });
 

  })
  }
};

