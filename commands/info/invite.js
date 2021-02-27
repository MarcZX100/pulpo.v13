const Discord = require('discord.js')
//const functions = require("/app/modules/functions.js");
//     app/commands/Info/invite
//     app/modules/functions

module.exports = {
	name: 'invite',
	cooldown: 5,
	aliases: ['inv'],
	description: 'Invite links!', 
  permissions: [],
	guildOnly: false,
	enabled: true,
  exec: async (client, message, args) => {
    

    var emcolor = [0]
    if (message.guild) emcolor = message.guild.me.displayHexColor
      
    if (!message.guild) emcolor = client.config.colors.general
      
const embed = new Discord.MessageEmbed()
.setTitle("Invite Links")
.setColor(emcolor)
.addField("Official discord server",`[Server Link](https://discord.gg/nzwDdEM)`)
.addField("Invite me to your server",`[Bot Link](https://discord.com/oauth2/authorize?client_id=758388900468883466&permissions=8&scope=bot)`)
.setTimestamp(new Date())

    message.channel.send(embed)
    
}}
