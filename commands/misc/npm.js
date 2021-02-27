const Discord = require("discord.js")

const fetch = require("node-fetch")

module.exports = {
	name: 'npm',
	cooldown: 5,
	aliases: ['npminfo', 'npmi', 'npmsearch'],
	description: 'npm!', 
  permissions: [],
	guildOnly: false,
	enabled: true,
  exec: async (client, message, args) => {
		
    if(!args) return message.channel.send("What package am I supposed to show you?");

    const body = await fetch(`https://registry.npmjs.com/${args}`)
      .then((res) => {
        if(res.status === 404) message.reply("No results found.");
        return res.json();
      });

    const version = body.versions[body["dist-tags"].latest];

    let deps = version.dependencies ? Object.keys(version.dependencies) : null;
    let maintainers = body.maintainers.map((user) => user.name);

    if(maintainers.length > 10) {
      const len = maintainers.length - 10;
      maintainers = maintainers.slice(0, 10);
      maintainers.push(`...${len} more.`);
    }

    if(deps && deps.length > 10) {
      const len = deps.length - 10;
      deps = deps.slice(0, 10);
      deps.push(`...${len} more.`);
    }

    const embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle(`NPM - ${args}`)
      .setURL(`https://npmjs.com/package/${args}`)
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ size: 64 }))
      .setDescription([
        body.description || "No Description.",
        `**Version:** ${body["dist-tags"].latest}`,
        `**License:** ${body.license}`,
        `**Author:** ${body.author ? body.author.name : "Unknown"}`,
        `**Modified:** ${new Date(body.time.modified).toDateString()}`,
        `**Dependencies:** ${deps && deps.length ? deps.join(", ") : "None"}`
      ].join("\n"));

    return message.channel.send(embed);
  }
}
