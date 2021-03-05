const { Schema, model } = require("mongoose");
const config = require('./../config.json');

const guildSchema = Schema({
    guildID: {
        type: String,
        required: true
    },
    prefix: {
      type: String,
      required: true,
      default: config.prefixes[0]
    },
    language: {
        type: String,
        required: true,
        default: "en"
    }
});

module.exports = model("guildModel", guildSchema, "GUILD_COLLECTION");
