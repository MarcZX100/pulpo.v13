const Discord = require('discord.js');
const us = require("/app/models/uses.js");

module.exports = {
	name: 'botstats',
	cooldown: 5,
	aliases: ['stats', 'botinfo'],
	description: 'The stats of this bot!', 
  permissions: [],
	guildOnly: false,
  nsfwOnly: false,
  enabled: true,
  exec: async (client, message, args) => {

      let days = Math.floor(message.client.uptime / 86400000);
      let hours = Math.floor(message.client.uptime / 3600000) % 24;
      let minutes = Math.floor(message.client.uptime / 60000) % 60;
      let seconds = Math.floor(message.client.uptime / 1000) % 60; 
  
    
    var nu = []

Array.prototype.max = function() {
  return Math.max.apply(null, this);
};

Array.prototype.min = function() {
  return Math.min.apply(null, this);
};

    
var con = 0;
const h = us.find({__v: 0})
h.then((doc) => {
  doc.forEach((doc) => {
  nu.push(`${doc.uses}`)
    con += doc.uses
})

const maxcmd = us.findOne({uses: nu.max()})
maxcmd.then((cmd) => {
  

    
 const embed = new Discord.MessageEmbed()
 .setTitle("Github page")
 .setDescription("Here you have the stats of the bot")
 .addField("Servers Size", message.client.guilds.cache.size)
 .addField("Users Size", message.client.users.cache.size)
 .addField("Used RAM", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`)
 .addField("Bot Owner", client.users.cache.get(client.config.owners).tag)
 .addField("Bot Uptime", `${days}d ${hours}h ${minutes}m ${seconds}s`)
 .addField("Commands Used", `${con} times`)
 .addField("Most Used Command", `${cmd.command.charAt(0).toUpperCase() + cmd.command.slice(1)} used ${nu.max()} times`)
 .setThumbnail(client.user.avatarURL())
 .setTimestamp(new Date())
 .setColor(client.color)
    
message.channel.send(embed)
})
  })
}}
