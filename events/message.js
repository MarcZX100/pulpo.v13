const Discord = require('discord.js');
const embeds = require('../modules/embeds.js');
const cooldown = {};
const Uses = require("../models/uses.js");
const Enmap = require("enmap");
const db = require("megadb"); //aca definimos db para lo que necesitemos mas adelante
let desactivadodb = new db.crearDB("ComandosDesactivados");
const fs = require("fs");
const guildModel = require("../models/guildModel");
var lang = ""
module.exports = async message => {
    try {
      const bot = message.client;
      const msg = message;
        if(msg.author.bot || !msg.guild) return;

        
              let guildDocument = await guildModel.findOne({
        guildID: message.guild.id
      });
        let prefix = !guildDocument.prefix ? bot.config.prefixes[0] : guildDocument.prefix;
        
        let argsSlice = prefix.length;

        if(!msg.content.toLowerCase().startsWith(prefix.toLowerCase())) {
            let content = msg.content.trim();
            let mention1 = '<@!' + bot.user.id + '>';
            let mention2 = '<@' + bot.user.id + '>';

            if(content == mention1 || content == mention2)
                return embeds.mention(msg, prefix, bot);

            if(content.startsWith(mention1)) argsSlice = mention1.length
            else if(content.startsWith(mention2)) argsSlice = mention2.length
            else return;
        }

        let args = msg.content.slice(argsSlice).trim().split(/ +/g);
        let command = args.shift().toLowerCase();
        let cmdFile = bot.commands.get(command) || bot.commands.find(cmdFile => cmdFile.aliases && cmdFile.aliases.includes(command));

        if(!cmdFile) return;
if (message.guild) {
    if (!message.guild.language && message.guild) {
      let language = "en";
      let guildDocument = await guildModel.findOne({
        guildID: message.guild.id
      });
      if (guildDocument && guildDocument.language)
        language = guildDocument.language;
      message.guild.language = language;
    }
    if (!message.guild) {
      let language = "en";
      let lang = "en";
    }
  }
      
      if (message.guild) {
    if (
      !cmdFile.enabled ||
      desactivadodb.tiene(
        `ComandosDesactivados_${command}_${message.guild.id}`,
        `g${message.guild.id}`
      )
    )
      return await message.channel.send(
        message.client.i18n.get(
          message.guild.language,
          "errors",
          "command_disabled"
        )
      );
  
  if (
    cmdFile.ownerOnly &&
    !message.client.config.owners.includes(message.author.id)
  )
    return await message.channel.send(
      message.client.i18n.get(
        message.guild.language,
        "errors",
        "command_owner_only",
        { command: cmdFile.name }
      )
    );
  if (cmdFile.nsfwOnly && !message.channel.nsfw)
    return await message.channel.send(
      message.client.i18n.get(
        message.guild.language,
        "errors",
        "nsfw_only",
        { command: cmdFile.name }
      )
    );
    
  if (
    cmdFile.permissions &&
    !(
      message.client.config.owners.includes(message.author.id) ||
      message.member.permissions.has(cmdFile.permissions)
    )
  )
    return await message.channel.send(
      message.client.i18n.get(
        message.guild.language,
        "errors",
        "not_enough_permission",
        { permissions: cmdFile.permissions.join(", ") }
      )
    );
              if (cmdFile.botpermissions && !message.guild.me.permissions.has(cmdFile.botpermissions))
    return await message.channel.send(
      message.client.i18n.get(
        message.guild.language,
        "errors",
        "not_bot_enough_permission",
        { permissions: cmdFile.botpermissions.join(", ") }
      )
    );
  
      };
        if (cmdFile.guildOnly && !message.guild)
    return await message.channel.send(
      message.client.i18n.get(
        lang,
        "errors",
        "command_guild_only"
      )
    );
    
    let numuses = 1;
  Uses.findOne(
    {
      command: cmdFile.name
    },
    (err, res) => {
      if (err) console.log(err);

      if (!res) {
        const newDoc = new Uses({
          command: cmdFile.name,
          uses: 0
        });
        newDoc.save().catch(err => console.log(err));
      } else {
        res.uses = res.uses + numuses;
        res.save().catch(err => console.log(err));
      }
    }
  );
        if(cmdFile.cooldown) {
            if(!cooldown[msg.author.id])
                cooldown[msg.author.id] = {};

            let time = cooldown[msg.author.id][cmdFile.name] || 0;
            if(time && (time > Date.now())) {
                let wait = ((time - Date.now())/ 1000).toFixed(2);
                      return message.channel.send(
         message.client.i18n.get(
          message.guild.language,
          "errors",
          "wait_cooldown",
          { cooldown: wait, command: cmdFile.name }
        )
      )
            }
            cooldown[msg.author.id][cmdFile.name] = Date.now() + (cmdFile.cooldown * 1000);
        }


message.channel.startTyping()
        cmdFile.exec(bot, msg, args).then(message.channel.stopTyping());
    } catch(err) {
        console.log('Command execution error - ' + err);
    }
}
