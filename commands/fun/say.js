module.exports = {
  name: "say",
  cooldown: 5,
  aliases: ["s"],
  description: "The bot will say whatever you want!", 
  permissions: [],
  guildOnly: false,
  enabled: true,
  exec: async (client, message, args) => {
    if (message.deletable) message.delete();

    var arg = message.cleanContent
      .split(" ")
      .slice(1)
      .join(" ");

    if (!arg) {
      message.channel.send("What do you want me to say?");
    } else message.channel.send(arg);
  }
};
