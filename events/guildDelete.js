// This event executes when a new guild (server) is left.
module.exports = (client, guild) => {
	
//this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`pp!help | Connected to ${client.guilds.cache.size} servers and ${client.users.cache.size} users!`)
	client.channels.cache.get("762595704421482506").send({embed: {
      color: 3447003,   
      author: {
          name: `ID: ${guild.id}\n Name: ${guild.name}`,
          icon_url: guild.iconURL()
      },
      title: "Me han quitado de un servidor",    
      fields: [{
          name: "Info:",
          value: `Region: ${guild.region}\nRoles: ${guild.roles.cache.size}\nMiembros: ${guild.memberCount}\nDueño: ${guild.owner.user.username}#${guild.owner.user.discriminator}\n(${guild.owner.user.id})`
        }
      ],
      timestamp: new Date(),
      
    }}	
)
}
