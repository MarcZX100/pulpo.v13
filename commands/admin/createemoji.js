module.exports = {
	name: 'createemoji',
	cooldown: 5,
	aliases: ['cemoji', 'newemoji', 'ce', 'create-emoji'],
	description: 'Creates a new emoji from an image link!',
	guildOnly: true,
	usage: '<emoji name><image link>',
  enabled: true, 
  permissions: ["MANAGE_EMOJIS"],
  exec: async (client, message, args) => {
  
var lang = []
        if (message.guild) lang = message.guild.language 
        if (!message.guild) lang = message.channel.language
      	  
	  
    const name = args[0]
    const link = args[1]
    message.guild.emojis.create(`${link}`, `${name}`).then(e => {
		message.channel.send(client.i18n.get(lang, "commands", "emoji_created", { e }))
    })
}}
