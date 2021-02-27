module.exports = {
	name: 'rolelist',
	cooldown: 5,
	aliases: ['roles', 'rl'],
	description: 'Roles of this guild!', 
  permissions: [],
	guildOnly: true,
	enabled: true,
  exec: async (client, message, args) => {

                var emcolor = [0]
    if (message.guild) emcolor = message.guild.me.displayHexColor
      
    if (!message.guild) emcolor = client.config.colors.general
    
let rolemap = message.guild.roles.cache
            .map(roles => `\<@&${roles.id}\>`)
            .join(" | ");
            if (!rolemap) rolemap = "There are no roles";		
		
		
if (rolemap.length < 2048) {
   message.channel.send({embed: {
      color: emcolor,
     
      title: `List of the roles of this server`,
      description: rolemap,
      timestamp: new Date()
       }},
   );
}
      if (rolemap.length > 2048) {
   message.channel.send({embed: {
      color: emcolor,
     
      title: `List of the roles of this server`,
      description: rolemap.slice(0, 2048)
       }},
   );
        
   message.channel.send({embed: {
      color: emcolor,
     
      description: rolemap.slice(2048, rolemap.length),
      timestamp: new Date()
       }},
   );
        
        }		
		


	},
};


