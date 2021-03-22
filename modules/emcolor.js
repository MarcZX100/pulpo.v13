const Discord = require('discord.js');

module.exports.color = (message) => {
    var emcolor = [0];
    if (message.guild) emcolor = message.guild.me.displayHexColor;
    if (!message.guild) emcolor = message.client.config.colors.general;
    return emcolor;
};
