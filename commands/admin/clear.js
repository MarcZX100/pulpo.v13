module.exports = {
	name: 'clear',
	cooldown: 2,
	aliases: ['purge'],
	description: 'Command which deletes messages! The max number of messages you can delete is 100.',
	guildOnly: true,
	usage: "<number of messages>",
  enabled: true, 
  permissions: ["MANAGE_MESSAGES"],
  exec: async (client, message, args) => {

const nums = args[0]

 if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.reply("I don\'t have perms :c")
		
	
      if(!nums) return message.channel.send("You must provide a number between 1-100")
      let number = nums
      if(isNaN(number)) return message.reply(`You can\'t erease \`${number}\` messages xd`)
      number = parseInt(number)
      if(number >= 101 || number <= 0) return message.channel.send("The max number is 100")
			
		

const moment = require("moment")
message.channel.messages.fetch({
    limit: number
}).then((messages) => { 
    const deleted = [];
    const info = [];
    messages.filter(message => message.channel.id === message.channel.id).forEach(message => deleted.push(`--${message.author.tag} at ${moment.utc(new Date()).format('MM/DD/YYYY h:mm:ss')}\n \n${message}\n \n`))
    message.channel.bulkDelete(messages).then(() => {
        message.channel.send(`Cleared ${nums} messages`).then(message => message.delete({
            timeout: 3000
        }))
    })

var fs = require('fs');
const content = deleted
const date = moment.utc(new Date()).format('MM_DD_YYYY_h_mm_ss')
const file = `${message.guild.id}_${message.author.id}_${date}.txt`
  fs.appendFile(file, content, function(err, result) {
     
info.push(`There were ${nums} message(s) cleared at ${message.guild} by ${message.author.username}`, {
  files: [
    file
  ]
});
const owner = message.guild.owner
owner.send(`There were ${nums} message(s) cleared at ${message.guild} by ${message.author.username}`, {
  files: [
    file
  ]
})    
message.channel.send(`There were ${nums} message(s) cleared at ${message.guild} by ${message.author.username}`, {
  files: [
    file
  ]
});
if(err) console.log('error', err);
   });
}).catch(error => {
        message.channel.send(`There was an error: ${error}`)
      })		
	
 }}
