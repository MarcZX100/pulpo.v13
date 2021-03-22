const Discord = require("discord.js"); //Setea el Discord
const fetch = require("node-fetch");

module.exports = { //Lo exporta a el bot.js con el message.js
  name: "anime", //Nombre de comando
  cooldown: 5, //Tiempo para volver a usar el comando (en segundos)
  aliases: ["animeinfo", "anime-info"], //Aliases para usarlo
  description: "Get stats and info from any anime you provide!", //Descripción del comando
  guildOnly: false, //Si solo se puede usar en servidores
  ownerOnly: false, //Si solo lo puedo usar yo
  nsfwOnly: false, //Si solo se puede usar en canales NSFW
  usage: "<anime name>", //Uso del comando (solo args)
  permissions: [], //Permisos necesarios para ejecutar el comando
  enabled: true, //Si está encendido
  exec: async (client, message, args) => { //Ejecutar con async para el await
    var lang = [];
    if (message.guild) lang = message.guild.language;
    if (!message.guild) lang = message.channel.language;  
        if(!args.length) return message.channel.send("Baka! What Anime should I search?");
    let [title, page = "1"] = args.join(" ").split(", ");
    // page = page.verifyInt(page, 1);

    const { data } = await fetch(`https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(title)}`)
      .then((r) => r.json());

    if(!data || !data.length) return message.channel.send("No results found.");

    const res = data[page - 1];
    if(!res) return message.channel.send(`Invalid page ${page} there is only ${data.length} pages.`);
    
    const embed = new Discord.MessageEmbed()
      .setTitle(res.attributes.titles.en ? `${res.attributes.titles.en} (Japanese: ${res.attributes.titles.en_jp})` : res.attributes.titles.en_jp)
      .setDescription(res.attributes.synopsis)
      .addField("Age Rating", `${res.attributes.ageRating}${res.attributes.ageRatingGuide ? ` (${res.attributes.ageRatingGuide})` : ""}`)
      .addField("Episodes", `${res.attributes.episodeCount} (${res.attributes.episodeLength} Min Per Episode) (${(res.attributes.episodeLength) * (res.attributes.episodeCount)} Min in total)`)
      .setImage(res.attributes.coverImage && res.attributes.coverImage.original)
      .setThumbnail(res.attributes.posterImage && res.attributes.posterImage.original)
      .setURL(`https://kitsu.io/anime/${res.id}`)
      .setFooter(`Page ${page}/${data.length}`)
      .setColor(client.color)
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ size: 64 }));

    message.channel.send({ embed })
  }
};
