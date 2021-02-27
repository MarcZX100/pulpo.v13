const Discord = require('discord.js')
// This event executes when a new guild (server) is joined.
const guildModel = require("../models/guildModel");
module.exports = async guild => {
	// We need to add this guild to our settings!
	// eslint-disable-line no-undef
  await guildModel.create({
    guildID: guild.id
  });
  guild.language = "en";
  

};
