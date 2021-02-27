const { MessageEmbed } = require("discord.js")

module.exports = {
	name: 'serverinfo',
	cooldown: 5,
	aliases: ['server', 'si'],
	description: 'Displays all info about this server!',
  permissions: [],
	guildOnly: true,
	enabled: true,
  exec: async (client, message, args) => {
		
                var emcolor = [0]
    if (message.guild) emcolor = message.guild.me.displayHexColor
      
    if (!message.guild) emcolor = client.config.colors.general
    
         function checkDays(date) {
         let now = new Date();
         let diff = now.getTime() - date.getTime();
         let days = Math.floor(diff / 86400000);
         return days + (days == 1 ? " day" : " days") + " ago";
};
     let inline = true
     
     
    let region = {
         "brazil": ":flag_br: Brazil",
         "europe": ":flag_eu: Europe",
         "singapore": ":flag_sg: Singapore",
         "us-central": ":flag_us: U.S. Central",
         "sydney": ":flag_au: Sydney",
         "us-east": ":flag_us: U.S. East",
         "us-south": ":flag_us: U.S. South",
         "us-west": ":flag_us: U.S. West",
         "eu-west": ":flag_eu: Western Europe",
         "vip-us-east": ":flag_us: VIP U.S. East",
         "london": ":flag_gb: London",
         "amsterdam": ":flag_nl: Amsterdam",
         "hongkong": ":flag_hk: Hong Kong",
         "russia": ":flag_ru: Russia",
         "southafrica": ":flag_za:  South Africa"
     };
     
     const status = {
        false: "No",
        true: "Yes"
      }
     
     
     
     
         //create an embed with information about the server and send it to the channel
      let embed = new MessageEmbed()
      .setColor(emcolor)
      .setTitle("Server Info")
      .setThumbnail(message.guild.iconURL())
      .setAuthor(`${message.guild.name}`, message.guild.iconURL())
      .addField("**Guild Owner**", message.guild.owner.user, true)
      .addField("**Guild ID**", `${message.guild.id}`, true)
      .addField("**Member Count**", `Total |**${message.guild.members.cache.size}**| \nHumans |**${message.guild.members.cache.filter(member => !member.user.bot).size}**| \nBots |**${message.guild.members.cache.filter(member => member.user.bot).size}**|`, true)
      .addField("**Region**", `${region[message.guild.region]}`, true)
      .addField("**Channels**", `Text channels: ${message.guild.channels.cache.filter(m => m.type === 'text').size}\nVoice channels: ${message.guild.channels.cache.filter(m => m.type === 'voice').size}\nTry \`pp!channellist\``, true)
      .addField("**Roles**", `${message.guild.roles.cache.size} \n\`Try pp!rolelist\``, true)
      .addField("**Verification level**", message.guild.verificationLevel, true)
      .addField("**Created On**", message.guild.createdAt, true)
      .setFooter(`© ${message.guild.me.displayName}`, message.guild.iconURL());
    
 message.channel.send(embed)   

}}
