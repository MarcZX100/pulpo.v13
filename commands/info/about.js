
const Discord = require("discord.js")

module.exports = {
	name: 'about',
	cooldown: 5,
	aliases: ['aboutbot', 'why'],
	description: 'Here you have info about why I made the bot and some acknowledgements to special people.',
	guildOnly: false,
  ownerOnly: false, 
	usage: '',
  permissions: [],
  enabled: true,
	exec: async (client, message, args) => {
		

		
var emcolor = [0]
    if (message.guild) emcolor = message.guild.me.displayHexColor
    if (!message.guild) emcolor = client.config.colors.general
var lang = []
        if (message.guild) lang = message.guild.language 
        if (!message.guild) lang = message.channel.language
            message.channel.startTyping();

    const about = new Discord.MessageEmbed()
    .setTitle(client.user.tag)
    .setColor(emcolor)
    .addField("Acknowledgements", `${client.users.cache.get(client.config.members.nath).tag} ${client.users.cache.get(client.config.members.candela).tag} ${client.users.cache.get(client.config.members.pulpo).tag} ${client.users.cache.get(client.config.members.piedra).tag}`)
    message.channel.send(about)
       
	    message.channel.stopTyping();
	},
};
