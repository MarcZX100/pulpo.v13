const Discord = require('discord.js');

module.exports.mention = (message, prefix, bot) => {
    let embed = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .setDescription('My prefix in this guild is `' + prefix + '`.\nUse `' + prefix + 'help` to view my commands.');

    return message.channel.send(embed);
};

module.exports.nsfw = (message) => {
    let embed = new Discord.MessageEmbed()
        .setColor(message.client.config.colors.error)
        .setTitle('Not a NSFW channel')
        .setDescription('Use NSFW commands in a NSFW marked channel.');

    return message.channel.send(embed);
};

module.exports.permissions = (message, cmdFile) => {
    let embed = new Discord.MessageEmbed()
        .setColor(message.client.config.colors.error)
        .setTitle('Access restricted')
        .setDescription('You are not allowed to use this command.\nRequired permissions: `' + cmdFile.permissions.join("`, `") + '`.');

    return message.channel.send(embed);
};

module.exports.botpermissions = (message, cmdFile) => {
    let embed = new Discord.MessageEmbed()
        .setColor(message.client.config.colors.error)
        .setTitle('Command restricted')
        .setDescription('I am not allowed to use this command.\nRequired permissions: `' + cmdFile.botpermissions.join("`, `") + '`.');

    return message.channel.send(embed);
};

module.exports.cooldown = (message, time) => {
    let embed = new Discord.MessageEmbed()
        .setColor(message.client.config.colors.error)
        .setTitle('Slow down a bit')
        .setDescription('You are using this command too frequently. Wait ' + time + ' more seconds.');

    return message.channel.send(embed);
};
