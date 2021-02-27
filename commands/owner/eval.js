const Discord = require("discord.js");

let candela = 50;
let potato = 50;

module.exports = {
  name: "eval",
  aliases: ["e"],
  description: "Eval command", 
  permissions: [],
  guildOnly: false,
  cooldown: 0,
  ownerOnly: true,
  enabled: true,
  exec: async (client, message, args) => {
    let toEval = args.join(" ");
    try {
      if (toEval) {
        let evaluated = eval(toEval, { depth: 0 });
        message.channel.send({
          embed: {
            color: client.config.colors.success,
            title: "Evaluation Executed!",
            description: `**Input:**\n \`${toEval}\` \n**Result:**\n${evaluated}`,
            author: {
              name: message.author.username,
              icon_url: message.author.avatarURL()
            },
            timestamp: new Date()
          }
        });
      }
    } catch (error) {
      message.channel.send({
        embed: {
          color: client.config.colors.error,
          title: "Evaluation Cancelled",
          description: `**Input:**\n \`${toEval}\` \n**Result:**\n${error}`,
          author: {
            name: message.author.username,
            icon_url: message.author.avatarURL()
          },
          timestamp: new Date()
        }
      }).catch(e => message.channel.send("error "+e));
    }
  }
};
