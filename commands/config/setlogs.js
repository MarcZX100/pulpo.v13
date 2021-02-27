const Discord = require("discord.js")
const guildModel = require("../../models/guildModel");

module.exports = {
	name: 'setlogs',
	cooldown: 5,
	aliases: ['setlogchannel', 'logging'],
	description: 'Sets a log channel to log all the server stuff!',
	guildOnly: true,
  ownerOnly: false, 
	usage: '<channel> / false',
  permissions: ["ADMINISTRATOR"],
  enabled: true,
	exec: async (client, message, args) => {
		
    var lang = [];
if (message.guild) lang = message.guild.language;
if (!message.guild) lang = message.channel.language;
    
        var emcolor = [0]
    if (message.guild) emcolor = message.guild.me.displayHexColor
      
    if (!message.guild) emcolor = client.config.colors.general
    
    if (args[0] = "false") {let guildDocument = await guildModel.findOne({
            guildID: message.guild.id
        });
        if (!guildDocument) guildDocument = new guildModel({
            guildID: message.guild.id
        });
        guildDocument.logs = `1`
        await guildDocument.save()
                           };
    const logcha =  message.mentions.channels.first() || message.channel;
 
    
    let guildDocument = await guildModel.findOne({
            guildID: message.guild.id
        });
        if (!guildDocument) guildDocument = new guildModel({
            guildID: message.guild.id
        });
        guildDocument.logs = `${logcha.id}`
        await guildDocument.save();
    
    logcha.send("This channel will now receive the server updates")

	},
};
