module.exports = {
	name: 'channellist',
	cooldown: 5,
	aliases: ['cl', 'channels'],
	description: 'List of the channels of this guild!', 
  permissions: [],
	guildOnly: true,
	enabled: true,
  exec: async (client, message, args) => {

                var emcolor = [0]
    if (message.guild) emcolor = message.guild.me.displayHexColor
      
    if (!message.guild) emcolor = client.config.colors.general
    
   const lepush = (q,c) => {
  if(c.type=="text") q.push(`#️⃣ ${c.name}`)
  else if(c.type=="voice") q.push(`🔊 ${c.name}`)
  else if(c.type=="news") q.push(`📣 ${c.name}`)
  else if(c.type=="store") q.push(`🏷️ ${c.name}`)
  else if(c.type=="category") q.push(`> ${c.name}`)
  else q.push(`#️⃣ ${c.name}`)
}

let categorias = message.guild.channels.cache.filter(q=>q.type=="category").sort((p,c)=>p.position- c.position)
let canales = []
message.guild.channels.cache.filter(q=>q.type!="category").filter(q=>!q.parentID).sort((p,c)=>p.position- c.position).forEach(c=>lepush(canales,c))
categorias.forEach(c=>{
  lepush(canales,c)
  message.guild.channels.cache.filter(q=>q.parentID==c.id).sort((p,c)=>p.position- c.position).forEach(c=>lepush(canales,c))
})

	
		
if (canales.length > 2048)    
   message.channel.send({embed: {
      color: emcolor,
     
      title: `List of the channels of this server`,
      description: canales.join("\n"),
      timestamp: new Date()
       }},
   );
      if (canales.length < 2048) {
   message.channel.send({embed: {
      color: emcolor,
     
      title: `List of the channels of this server`,
      description: canales.join("\n").slice(0, 2048)
      }},
   );
} else {
        
   message.channel.send({embed: {
      color: message.guild.me.displayHexColor,
     
      description: canales.join("\n").slice(2048, canales.length),
      timestamp: new Date()
       }},
   );
        
        }		
		


	},
};
