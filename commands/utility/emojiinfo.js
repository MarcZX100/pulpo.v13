const Discord = require("discord.js")

module.exports = {
  name: "emojiinfo",
  cooldown: 5,
  aliases: ["ei", "infoemoji", "emoji-info"],
  description: "Displays info about an emoji!", 
  permissions: [],
  guildOnly: true,
  enabled: true,
  exec: async (client, message, args) => {
  
  function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " day" : " days");
    };		

if (!args) return message.reply("you must enter an emoji!")
		let emoji = message.guild.emojis.cache.get(args[0]) || Discord.Util.parseEmoji(args[0])
		emoji = message.guild.emojis.cache.get(emoji.id)
		if (!emoji) return message.reply("I could not find any emoji with that name/id!")
		let animated
		if (emoji.animated) animated = "Yes"
		if (!emoji.animated) animated = "No"

		let embed = new Discord.MessageEmbed()
		.setColor(client.color)
		.setThumbnail(emoji.url)
    .setTitle("**EMOJI INFO**")
		.addField(`Emoji Name`, `\`${emoji.name}\``)
		.addField(`Emoji ID`, `\`${emoji.id}\``)
		.addField(`Emoji created at`, `\`- ${emoji.createdAt.toDateString()}. (${checkDays(emoji.createdAt)} ago)\``)
		.addField(`Is animated?`, animated)
		.addField(`Emoji`, `\`${emoji}\``)
		.addField(`Emoji file`, emoji.url)

		message.channel.send(embed)
}}
