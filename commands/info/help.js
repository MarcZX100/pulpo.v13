const { MessageEmbed } = require("discord.js");

const Uses = require("../../models/uses.js");

module.exports = {
  name: "help",
  aliases: ["h"],
  permissions: [],
  enabled: true,
  nsfwOnly: false,
  cooldown: 5,
  exec: async (client, message, args) => {
    var lang = [];
    if (message.guild) lang = message.guild.language;
    if (!message.guild) lang = message.channel.language;

    var emcolor = [0];
    if (message.guild) emcolor = message.guild.me.displayHexColor;

    if (!message.guild) emcolor = client.config.colors.general;
            const help = {};
                const embed2 = new MessageEmbed()
    if (!args[0]) {
     const embed1 = new MessageEmbed()
                .setColor(emcolor)
                .setDescription(client.i18n.get(lang, "commands", "help_embed_title"))
                .setTimestamp(new Date())
          
          const commands = client.commands.filter(cmd => {
					if (cmd.ownerOnly) return false;
					return true;
				});
          
          
            commands.forEach(command => {
                const cat = command.module;
                if (!help.hasOwnProperty(cat)) help[cat] = [];
                help[cat].push("`" + command.name + "`");
            });
            let str = "";
            for (let category in help) {
                embed1.addField(`**${category.charAt(0).toUpperCase() + category.slice(1)}**`, help[category].join(" | "));
            }
            await message.channel.send(embed1)
    };

    if(args[0]) {
      const cmd = args[0]


if (client.commands.has(cmd) || client.aliases.has(cmd)) {
        let command = client.commands.get(cmd) || client.aliases.get(cmd);
        Uses.findOne(
          {
            command: command.name
          },
          (err, res) => {
            if (err) console.log(err);
              embed2.setTitle(command.name)
              .setDescription(command.description)
              .setColor(emcolor)
              .addField(
                client.i18n.get(
                  message.guild.language,
                  "commands",
                  "help_usage"
                ),
                message.client.config.prefixes[0] +
                  command.name +
                  " " +
                  (command.usage ? command.usage : "")
              )
              .addField(
                client.i18n.get(
                  message.guild.language,
                  "commands",
                  "help_name"
                ),
                command.name
              )
              .addField("Cooldown", command.cooldown + "s")
              .addField(
                client.i18n.get(
                  message.guild.language,
                  "commands",
                  "help_permissions"
                ),
                command.permissions[0]
                  ? "```" + command.permissions.join(", ") + "```"
                  : client.i18n.get(
                      message.guild.language,
                      "commands",
                      "not_found"
                    )
              )
              .addField(
                client.i18n.get(
                  message.guild.language,
                  "commands",
                  "help_aliases"
                ),
                command.aliases[0]
                  ? "`" + command.aliases.join("`, `") + "`"
                  : client.i18n.get(
                      message.guild.language,
                      "commands",
                      "not_found"
                    )
              )
              .addField("Times used", res.uses)
              .setTimestamp(new Date());
            message.channel.send(embed2);
          }
        );
      }
    }
    const cmd = args[0]
    if(args[0] && (!client.commands.has(cmd) && !client.aliases.has(cmd))) {
      const commands = client.commands.filter(cmd => {
        if (cmd.ownerOnly) return false;
        if (cmd.module !== args[0].toLowerCase()) return false;
        return true;
      });

      commands.forEach(command => {
        const cat = command.module;
        if (!help.hasOwnProperty(cat)) help[cat] = [];
        help[cat].push("`" + command.name + "`");
      });
      let str = "";
      const embed3 = new MessageEmbed();
      for (let category in help) {
        embed3
          .setColor(emcolor)
          .setDescription(client.i18n.get(lang, "commands", "help_embed_title"))
          .setTimestamp(new Date())
          .addField(
            `**${category.charAt(0).toUpperCase() + category.slice(1)}**`,
            help[category].join(" | ")
          );
      }
      await message.channel.send(embed3).catch(e => {
        const command = args
          message.channel.send(
            client.i18n.get(
              message.guild.language,
              "commands",
              "help_not_found",
              { command }
            )
          );
        });
    }
  }
}
