module.exports = {
	name: 'lock',
	cooldown: 10,
	aliases: ['channellock', 'antiraid'],
	description: 'Locks the current channel!',
	guildOnly: true,
  ownerOnly: false, 
	usage: '',
  permissions: ["MANAGE_MESSAGES"],
  enabled: true,
	exec: async (client, message, args) => {
		
    const channel = message.channel
              channel.updateOverwrite(message.guild.roles.everyone, { 
                    SEND_MESSAGES: false //esto hace que el rol everyone cambie los permisos, a que no puedan mandar mensajes en ningun canal
                }).then(() => {
                    channel.send(client.i18n.get(message.channel.language, "commands", "channel_lock", { channel })) //establece que en todos los canales a la hora de poner <prefix>lock on los nombres de los canales se les agregue un candado
                })
    
      	},
  };
