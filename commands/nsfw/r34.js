//primero instalaremos el Modulo "rule34js" usando npm install rule34
const booru = require("booru")
const Discord = require("discord.js")

module.exports = {
	name: 'r34',
	cooldown: 2,
	aliases: ['34r', 'rule34', '34rule'],
	description: 'Sends you some ', 
  permissions: [],
	guildOnly: true,
  nsfwOnly: true,
  enabled: true,
  exec: async (client, message, args) => {
		
let tags = args[0]

if(message.channel.nsfw) { 
await booru.search('rule34', [tags], { limit: 3, random: true })
.then(posts => {
for(let post of posts) {
message.channel.send(post.fileUrl)
 }}
      
 ).catch(e => message.channel.send("You must add some args"))//un catch por si da error		
		
};
	}}
