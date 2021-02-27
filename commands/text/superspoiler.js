const Discord = require("discord.js")

module.exports = {
	name: 'superspoiler',
	cooldown: 5,
	aliases: ['super-spoiler', 'spoiler'],
	description: 'Transforms each character into a spoiler message!',
	guildOnly: false,
  ownerOnly: false, 
	usage: 'text',
  permissions: [],
  enabled: true,
	exec: async (client, message, args) => {
		
    var lang = [];
if (message.guild) lang = message.guild.language;
if (!message.guild) lang = message.channel.language;
      
    
        var emcolor = [0]
    if (message.guild) emcolor = message.guild.me.displayHexColor
      
    if (!message.guild) emcolor = client.config.colors.general
    
    
const txt = `${args}`
    
    						if (`||${txt.split('').join('||||')}||`.length > 2000) return message.channel.send('There was an error, your text is too long.');
    		 message.channel.send(`||${txt.split('').join('||||')}||`);

	},
};
