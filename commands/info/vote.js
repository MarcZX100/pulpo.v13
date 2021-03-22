const Discord = require("discord.js")
module.exports = {
	name: 'vote',
	cooldown: 5,
	aliases: ['topgg'],
	description: 'Vote for the bot at top.gg!',
	guildOnly: false,
  ownerOnly: false, 
	usage: '',
  permissions: [],
  enabled: true,
	exec: async (client, message, args) => {

var lang = []
        if (message.guild) lang = message.guild.language 
        if (!message.guild) lang = message.channel.language

const vote = new Discord.MessageEmbed()
.setColor(client.color)
.setTitle("Vote Pages")
.addField("Vote at top.gg",`[Link](https://top.gg/bot/758388900468883466/vote)`)
.setTimestamp(new Date())

    message.channel.send(vote)
    
	},
};
