module.exports = {
	name: 'avatar',
	aliases: ['icon', 'pfp'],
	description: 'Displays the avatar of any user!', 
  permissions: [],
	usage: "<user id/user mention>",
	guildOnly: false,
  enabled: true,
	exec: async (client, message, args) => {
    
	const Discord = require('discord.js');	
		
                var emcolor = [0]
    if (message.guild) emcolor = message.guild.me.displayHexColor
      
    if (!message.guild) emcolor = client.config.colors.general
  let persona = message.mentions.members.first() || message.guild.members.cache.find(x => x.id == args[0]) || message.member;//Sino menciono a naadie


message.channel.send({embed: {
  color: emcolor,
 author: {
    name: persona.user.tag,
   icon_url: persona.user.avatarURL({ format: 'png', dynamic: true, size: 2048 })
},
   title: `${persona.user.tag}\s profile photo`,
    image: {
  url: persona.user.avatarURL({ format: 'png', dynamic: true, size: 2048 })
}
}
})		
		
	},
};



