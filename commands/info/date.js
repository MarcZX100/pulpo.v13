const moment = require("moment")
const Discord = require("discord.js")

module.exports = {
	name: 'date',
	cooldown: 1,
	aliases: ['today', 'hour'],
	description: 'Displays the time!', 
  permissions: [],
	guildOnly: false,
	usage: '',
	enabled: true,
  exec: async (client, message, args) => {
const dmyhms = moment.utc(new Date()).format('dddd, DD/MM/YY h:mm:ss')

const inv = new Discord.MessageEmbed()
.setTitle("Here you have the actual hour!")
.setColor(client.color)
.setDescription(dmyhms)
.setFooter(`Requested by ${message.author.tag}`)

message.channel.send(inv)

}}
