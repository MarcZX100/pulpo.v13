const { ownerid } = require("../../config.json");
const exec = require("util").promisify(require("child_process").exec);

module.exports = {
  name: "execute",
  aliases: ["ex", "exec"],
  description: "execute command", 
  permissions: [],
  guildOnly: false,
  ownerOnly: true,
  enabled: true,
  exec: async (client, message, args) => {
    const result = await exec(args.join(" "), { timeout: 60000 }).catch(
      error => ({ stdout: null, stderr: error })
    );

    const output = result.stdout
      ? `**\`OUTPUT\`**${"```prolog\n" + result.stdout + "```"}`
      : "";
    const outerr = result.stderr
      ? `**\`ERROR\`**${"```prolog\n" + result.stderr + "```"}`
      : "";
    if (output === "" && outerr === "")
      return message.channel.send("No output returned.");
    return message.channel.send([output, outerr].join("\n"));
  }
};
