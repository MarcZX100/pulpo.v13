var Color = require('color');
var colorname = require('color-name');
const moment = require('moment');
/* global wait */
module.exports = client => {

  
// when the client is ready, run this code
// this event will only trigger one time after logging in
	
client.user.setActivity(`pp!help | Connected to ${client.guilds.cache.size} servers and ${client.users.cache.size} users!`)
// Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
    console.log(`-- ${moment().utc().format('Do MMMM')}, ${moment().utc().format('hh:mm a')} --`);
    console.log("-------------------------------");
    console.log(`[      BOT]: ${client.user.tag} is ready!`);
    console.log(`[ PREFIXES]: ${client.config.prefixes.join(", ")}`);
    console.log(`[ COMMANDS]: ${client.commands.size}`)
    console.log(`[   GUILDS]: ${client.guilds.cache.size}`);
    console.log(`[ CHANNELS]: ${client.channels.cache.size}`);
    console.log(`[    USERS]: ${client.users.cache.size}`);
    console.log(`[BOOT TIME]: ${process.uptime() * 1000}ms`);

  
};