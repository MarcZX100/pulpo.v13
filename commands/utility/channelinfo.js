const Discord = require("discord.js")

module.exports = {
  name: "channelinfo",
  cooldown: 5,
  aliases: ["ci", "infochannel"],
  description: "Displays info about a channel!", 
  permissions: [],
  usage: "<channel name/channel id/channel mention>",
  guildOnly: true,
  enabled: true,
  exec: async (client, message, args) => {
  
              var emcolor = [0]
    if (message.guild) emcolor = message.guild.me.displayHexColor
      
    if (!message.guild) emcolor = client.config.colors.general

//Definimos discord.

const channel = message.guild.channels.cache.find(x => x.name === args.join(" ")) || message.mentions.channels.first() || message.guild.channels.cache.find(x => x.id == args[0]) || message.channel;
 
function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " day" : " days");
    };		
    
const status = {
        false: "No",
        true: "Yes"
      }

let type = {
    "text": "Text Channel",
    "voice": "Voice Channel",
    "news": "News Channel",
    "store": "Stored Channel",
    "category": "Category"
};
    
    
    const messages = await channel.messages.fetch({ after: 1, limit: 1 });
		const fmsg = messages.first();         
    
//Definimos el canal del cual sacaremos informacion. Obteniendo el primer canal mencionado o la primera id.
    
//if (!channel) return message.reply("You must enter a channel!")
//Si  no menciono un canal o no puso una id, retorna.

//Definimos el embed que enviaremos
 const cha = new Discord.MessageEmbed()
    
   .setTitle(`:file_folder: **CHANNEL INFORMATION** :file_folder:`)
 
   .addField(`Channel name:`, `\`- ${Discord.Util.escapeMarkdown(channel.name)}\``) 

//Obtenemos el nombre del canal.

    .addField(`Channel Mention:`, `- ${channel}`)

//Un simple ejemplo de como se menciona este.

    .addField(`Channel ID:`, `\`- ${channel.id}\``)

//Se obtiene la id del canal.

    .addField(`Channel type`, `\`- ${type[channel.type]}\``)

//Obtenemos el tipo de canal, noticias, texto, voz etc
    
     .addField(`NSFW Channel?`, `\`- ${status[channel.nsfw]}\``)

//Revisamos si el canal es nswf, mediante un boolean (false | true)

    .addField(`Channel topic`, `\`- ${channel.topic ? channel.topic : "This channel has no topic."}\``)

//Se obtiene el tema del canal, si el contenido es menor a 1 caracter (Se hace esto por que a veces se buguean los temas) retorne a "No hay un tema."
//Si hay un tema, lo envia.
   
    .addField(`Channel parent`, `\`- ${channel.parent ? channel.parent.name : "This channel has not category."}\``)
 
//Obtenemos la categoria en el que esta el canal.
 
    .addField(`Channel created at`, `\`- ${channel.createdAt.toDateString()}. (${checkDays(channel.createdAt)} ago)\``)
 
  
    .addField('First Message', `[Jump!](${fmsg.url})`)
 
 //Primer mensaje del canal con link
    
    .setColor(client.color) //Color(?
    
    message.channel.send(cha)

    
}}
