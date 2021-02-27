const fs = require("fs");
const guildModel = require("../../models/guildModel");

module.exports = {
    name: "language",
    usage: "language <code>",
    description: "Command for changing guild's language",
    aliases: [ "lang" ],
    cooldown: 2,
    enabled: true,
    guilOnly: true,
    permissions: [ "BAN_MEMBERS" ],
    exec: async (client, message, args) => {
        let lang = args[0];
        if (!lang) return await message.channel.send(client.i18n.get(message.guild.language, "errors", "specify_language"));
        let languages = client.i18n.getLocales();
        if (!languages.includes(lang)) return await message.channel.send(client.i18n.get(message.guild.language, "errors", "specify_valid_language", { languages: languages.join(", ") }));
        let guildDocument = await guildModel.findOne({
            guildID: message.guild.id
        });
        if (!guildDocument) guildDocument = new guildModel({
            guildID: message.guild.id
        });
        guildDocument.language = lang;
        await guildDocument.save();
        message.guild.language = lang
        await message.channel.send(client.i18n.get(lang, "commands", "language_updated"));
    }
}
