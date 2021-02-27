const Discord = require("discord.js")

module.exports = {
	name: 'userinfo',
	cooldown: 5,
	aliases: ['ui', 'user-info', 'infouser', 'whois'],
	description: 'Displays info about a user!', 
  permissions: [],
	guildOnly: true,
  enabled: true,
  exec: async (client, message, args) => {
		
    
    
const flags = {
	DISCORD_EMPLOYEE: '<:staff:775084475042365500>',
	DISCORD_PARTNER: '<:partner:775306556102410290>',
	BUGHUNTER_LEVEL_1: '<:bughunter1:775085693159342103>',
	BUGHUNTER_LEVEL_2: '<:bughunter2:775307247575629824>',
	HYPESQUAD_EVENTS: '<:hypesquadevents:775085179781644288>',
	HOUSE_BRAVERY: '<:bravery:775086794541760522>',
	HOUSE_BRILLIANCE: '<:brilliance:775086067476332574>',
	HOUSE_BALANCE: '<:balance:775086534100910131>',
	EARLY_SUPPORTER: '<:inicial:775085294532821002>',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
	bot: '<:bot:775085793789607997>',
	VERIFIED_BOT: 'Verified bot',
	VERIFIED_DEVELOPER: '<:botdeveloper:775085602341126224>',
	uwu: ':heart:',
	serverowner: '<:owner:775297887864225862>'
};		

                var emcolor = [0]
    if (message.guild) emcolor = message.guild.me.displayHexColor
      
    if (!message.guild) emcolor = client.config.colors.general
		
function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " day" : " days");
    };		
		
		
  let persona = message.mentions.members.first() || message.guild.members.cache.find(x => x.id == args[0]) || message.member;//Sino menciono a naadie

   
    const presenc = {
	  online: '<:online:775084660262174732> Online',
          offline: '<:offline:775084782425341993> Offline',
	  dnd: '<:nomolestar:775085448681750578> Dnd',
	  idle: '<:idle:775085068959612938> Idle'
  };

		
     let inline = true
     
     const status = {
        false: "No",
        true: "Yes"
      } 

let colour2 = persona.displayHexColor
const userFlags = persona.user.flags ? persona.user.flags.toArray() : [];		
if(persona.id == "689106697561702437") userFlags.push("uwu")
if(persona.id == message.guild.owner.id) userFlags.push("serverowner")
if(persona.user.bot == true) userFlags.push("bot")
const embed2 = new Discord.MessageEmbed()
.setColor(emcolor)
.setAuthor(persona.user.username, persona.user.avatarURL())
.setTitle(`**${persona.user.username}\'s Info**`)
.setThumbnail(persona.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
.addField("**Badges:**", userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None')
.addField(`**Username:**`, persona.user.tag, inline)
.addField("**Nickname:**", persona.nickname, inline)
.addField("**Presence:**", presenc[persona.user.presence.status], inline)
.addField("**Roles of this user:**", persona.roles.cache.size, inline)
.addField("**When entered the server?**", `${persona.joinedAt.toDateString()}. \n(*${checkDays(persona.joinedAt)} ago*)`)
.addField("**When was the account created?**", `${persona.user.createdAt.toDateString()}. \n(*${checkDays(persona.user.createdAt)} ago*)`)
.setTimestamp(new Date())
/*if (persona.user.presence.activities[0].name) {
 /* var ho = ""
  var dhms = ``;
  if (persona.user.presence.activities[0].timestamps) {
    let ho = new Date() - persona.user.presence.activities[0].timestamps.start;
  //  let dhms = `for ${days}d ${hours}h ${minutes}m ${seconds}s`
  }
if (persona.user.presence.activities[0].url) {
  let ho = persona.user.presence.activities[0].url;
  let dhms = `at [Here](${persona.user.presence.activities[0].url})`
}
  let ho = new Date() - persona.user.presence.activities[0].timestamps.start;
      let days = Math.floor(ho / 86400000);
      let hours = Math.floor(ho / 3600000) % 24;
      let minutes = Math.floor(ho / 60000) % 60;
      let seconds = Math.floor(ho / 1000) % 60; 
  
  //let dhms = `for ${days}d ${hours}h ${minutes}m ${seconds}s` || 
  
embed2.addField("**Activity**", `\`${persona.user.presence.activities[0].type} ${persona.user.presence.activities[0].name} for ${days}d ${hours}h ${minutes}m ${seconds}s\``)
  
} 
  */
    

message.channel.send(embed2).catch(e => message.channel.send("error "+e))
	

}
}
