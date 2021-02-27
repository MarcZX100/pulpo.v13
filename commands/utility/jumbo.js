const Discord = require("discord.js")

module.exports = {
	name: 'jumbo',
	cooldown: 5,
	aliases: ['bigemoji', 'hugemoji'],
	description: 'Displays the URL of the given emoji!',
	guildOnly: false,
	usage: '<emoji id/name>',
	enabled: true, 
  permissions: [],
  exec: async (client, message, args) => {
		
    
let emoji = message.guild.emojis.cache.get(args[0]) || Discord.Util.parseEmoji(args[0])
		emoji = message.guild.emojis.cache.get(emoji.id)
		if (!emoji) return message.reply("I couldn't fins that emoji! Are you sure it's the right id or name?");
    message.channel.send(emoji.url)

}}
