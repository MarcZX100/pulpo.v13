const moment = require('moment');
const { MessageEmbed } = require('discord.js');
const { util: { permissions } } = require('discord.js-commando');

module.exports = {
	name: 'roleinfo',
	cooldown: 5,
	aliases: ['ri', 'role-info', 'inforole', 'role'],
	description: 'Info of a role!', 
  permissions: [],
	guildOnly: false,
	usage: '[role id/mention/name]',
	enabled: true,
  exec: async (client, message, args) => {
		
		function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " day" : " days");
    };		
		
if (!args) return message.reply("you must enter a role!")
const role = message.guild.roles.cache.find(x => x.name === args.join(" ")) || message.guild.roles.cache.find(x => x.id == args[0]) || message.mentions.roles.first();
       if (!role) return message.reply("Are you sure that role exists?")
		const serialized = role.permissions.serialize();
		const perms = Object.keys(permissions).filter(perm => serialized[perm]);
		const embed = new MessageEmbed()
			.setColor(role.hexColor)
			.addField('❯ Name', role.name)
			.addField('❯ ID', role.id)
	         	.addField('❯ Users with it', role.members.size)
			.addField('❯ Color', role.hexColor.toUpperCase())
			.addField('❯ Creation Date', `${moment.utc(role.createdAt).format('MM/DD/YYYY h:mm A')}. \`(${checkDays(role.createdAt)} ago)\``)
			.addField('❯ Hoisted?', role.hoist ? 'Yes' : 'No')
			.addField('❯ Mentionable?', role.mentionable ? 'Yes' : 'No')
			.addField('❯ Position', role.position)
			.addField('❯ Permissions', perms.map(perm => permissions[perm]).join(', ') || 'None');
		return message.channel.send(embed);
	}
}
