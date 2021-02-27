const Discord = require("discord.js");

module.exports = {
  name: "everyonerole",
  cooldown: 5,
  aliases: ["giveeveryone", "role2everyone"],
  description: "Gives a role to each user on the server! Note: If you use the role name, it must be exactly the same way(including mayus.)",
  guildOnly: true,
  ownerOnly: false,
  usage: "<role id/role mention/role name>",
  permissions: ["ADMINISTRATOR"],
  enabled: true,
  exec: async (client, message, args) => {
    var lang = [];
    if (message.guild) lang = message.guild.language;
    if (!message.guild) lang = message.channel.language;

    var emcolor = [0];
    if (message.guild) emcolor = message.guild.me.displayHexColor;

    if (!message.guild) emcolor = client.config.colors.general;
    if (!message.guild.me.hasPermission("MANAGE_ROLES"))
      return message.reply("I don't have perms ");
    if (!args) return message.reply("you must enter a role to add!");
    const role =
      message.guild.roles.cache.find(x => x.name === args.join(" ")) ||
      message.guild.roles.cache.find(x => x.id == args[0]) ||
      message.mentions.roles.first();
    if (!role) return message.reply("are you sure that role exists?");
    const muser = message.author.id;
    const ch = message.channel;

    message.channel.send(
      `Are you sure you want to do this? You will give each user of this guild the ${role.name} role. You have 20 seconds for answering.\n\`yes / no\``
    );
    var filter = m => m.author.id == message.author.id;
    try {
      var collectedMessages = await message.channel.awaitMessages(filter, {
        time: 20000,
        max: 1,
        errors: ["time"]
      });
    } catch (e) {
      return message.reply(
        "you have not done the confirmation. Selection cancelled"
      );
    }
    var response = collectedMessages.first().content;
    if (response === "yes")
      message.channel
        .send(`You selected \`${response}\`. Adding roles...`)
        .then(message.channel.startTyping())
        .then(
          message.guild.members.cache
            .filter(m => !m.user.bot)
            .forEach(member => member.roles.add(role))
        )
        .then(message.channel.send("Done!"))
        .then(message.channel.stopTyping());

    if (response === "no")
      message.channel.send(
        `You selected \`${response}\`. Confirmation cancelled`
      );
  }
};
