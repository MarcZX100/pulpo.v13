const Uses = require("../models/uses.js");
const Enmap = require("enmap");
const db = require("megadb"); //aca definimos db para lo que necesitemos mas adelante
let desactivadodb = new db.crearDB("ComandosDesactivados");
const fs = require("fs");

const guildModel = require("../models/guildModel");
const activeUsers = {};
module.exports = async message => {
  if (message.author.bot) return;
  /*if (!message.guild) {
let language = "en"}*/
  
  var lang = []
        if (message.guild) lang = message.guild.language 
        if (!message.guild) lang = message.channel.language

  
  let prefix = message.client.config.prefixes[0],
    cmdFile;
  for (let i = 0; i < message.client.config.prefixes.length; i++) {
    if (message.content.startsWith(message.client.config.prefixes[i]))
      prefix = message.client.config.prefixes[i];
  }
  if (!message.content.toLowerCase().startsWith(prefix)) return;
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
    }
  }
  const args = message.content.toLowerCase().slice(prefix.length).split(" ");
  let command = args.shift();

  if (message.client.commands.has(command))
    cmdFile = message.client.commands.get(command);
  else if (message.client.aliases.has(command))
    cmdFile = message.client.aliases.get(command);
  else return;
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
  }
        if (cmdFile.guildOnly && !message.guild)
    return await message.channel.send(
      message.client.i18n.get(
        lang,
        "errors",
        "command_guild_only"
      )
    );

  {
    if (!activeUsers.hasOwnProperty(cmdFile.name))
      activeUsers[cmdFile.name] = [];
    if (activeUsers[cmdFile.name].includes(message.author.id))
      return await message.channel.send(
        message.client.i18n.get(
          message.guild.language,
          "errors",
          "wait_cooldown",
          { cooldown: cmdFile.cooldown, command: cmdFile.name }
        )
      );
  }
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

  cmdFile.exec(message.client, message, args);
  if (activeUsers.hasOwnProperty(cmdFile.name)) {
    activeUsers[cmdFile.name].push(message.author.id);
    message.client.setTimeout(() => {
      activeUsers[cmdFile.name].splice(
        activeUsers[cmdFile.name].indexOf(message.author.id),

        1
      );
    }, cmdFile.cooldown * 1000);
  }
};
