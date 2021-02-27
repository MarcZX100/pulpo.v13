const Enmap = require("enmap");
const db = require("megadb"); //aca definimos db para lo que necesitemos mas adelante
let desactivadodb = new db.crearDB("ComandosDesactivados");
const fs = require("fs");
 
module.exports = {
  name: "disablecommand", // set command name
  aliases: ["disable"], // set command aliases
  permissions: ["ADMINISTRATOR"], // set command permissions
  ownerOnly: false, // set true if command is owner only
  enabled: true, // set true if command enabled
  guildOnly: true,
  cooldown: 5, // in seconds
  exec: async (client, message, args) => {
    // the rest of the code

   var lang = []
        if (message.guild) lang = message.guild.language 
        if (!message.guild) lang = message.channel.language
      
   
    let comando = args[0]; //Aqui tomara el 2 texto que pongan un Ej: -activar @usuario (comando) y el let comando = args[1] va a tomar el (comando) y va a verificar si existe el comando o no

    if (!client.commands.has(comando)) {
      return message.reply(client.i18n.get(lang, "commands", "help_not_found", { command: comando }));
    } //Esto es lo de arriba de  let comando

  
    desactivadodb.establecer(`ComandosDesactivados_${comando}_${message.guild.id}`, `g${message.guild.id}`) 
    
    message.channel.send(`COMANDO: ${comando}, Desactivado Para: ${message.guild}`)
      .catch(() => {
        //Aqui enviamos un mensaje si no hay ningun error
        message.channel.send("___**Error revisa la Consola**___"); //Esto se enviara cada vez que hay un error en el comando
      });
  }
};
