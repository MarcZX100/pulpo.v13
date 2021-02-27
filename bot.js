const { Client } = require("discord.js");
const Discord = require("discord.js");
const { I18n } = require("locale-parser");
const Mongoose = require("mongoose");
const client = new Client();
//client.errors = require("./modules/errors");
client.config = require("./config.json");

client.i18n = new I18n({ defaultLocale: "en" });
Mongoose.connect(client.config.mongo_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});



client.on("guildCreate", guild => {

guild.channels.cache.filter(c => c.type === 'text').find(c => c.position == 0).createInvite({ unique: true, temporary: false }).then(invite => {


const embed = new Discord.MessageEmbed()
    
    .setTitle("Me han añadido a un servidor!")
    .addField(` ID: ${guild.id}\n Name: ${guild.name}`) 
    .setDescription(`Region: ${guild.region}\nRoles: ${guild.roles.cache.size}\nMiembros: ${guild.memberCount}\nDueño: ${guild.owner.user.username}#${guild.owner.user.discriminator}\n(${guild.owner.user.id})`)
    .addField(`Link`, `[Invitación](https://discord.gg/${invite.code})`)
    .setImage(guild.iconURL())
    .setColor(client.config.colors.success) //Color(?
    .setTimestamp(new Date())
    
  client.channels.cache.get("762595704421482506").send(embed)
           
console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!    Invite link: https://discord.gg/${invite.code}`);
client.user.setActivity(`pp!help | Connected to ${client.guilds.cache.size} servers and ${client.users.cache.size} users!`)
	
  })
})

client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`pp!help | Connected to ${client.guilds.cache.size} servers and ${client.users.cache.size} users!`)
	client.channels.cache.get("762595704421482506").send({embed: {
      color: client.config.colors.error,   
      author: {
          name: `ID: ${guild.id}\n Name: ${guild.name}`,
          icon_url: guild.iconURL()
      },
      title: "Me han quitado de un servidor",    
      fields: [{
          name: "Info:",
          value: `Region: ${guild.region}\nRoles: ${guild.roles.cache.size}\nMiembros: ${guild.memberCount}\nDueño: ${guild.owner.user.username}#${guild.owner.user.discriminator}\n(${guild.owner.user.id})`
        }
      ],
      timestamp: new Date(),
      
    }}	
)})


client.on("message", message => {

// Variable que permitirÃÂ¡ recibir mensajes al "dm"
  if (message.channel.type === "dm") {
if (message.author === message.client.user) return;
//Embed personalizado que se enviarÃÂ
  message.client.channels.cache.get("757164659882328074").send({embed: {
      color: 3447003,   
      author: {
          name: message.client.user.username,
          icon_url: message.client.user.avatarURL()
      },
      title: "Mensaje Directo",
      description: `Mensaje enviado por <@${message.author.id}>`,
      fields: [{
          name: "Mensaje:",
          value: message.content
        }
      ],
      timestamp: new Date(),
      
    }}
)
  }
});

client.on("message", message => {
	
	if (message.content.startsWith("😡")) {
        message.react("😡")
	message.channel.send("Jaja ta enojao"); 
	}
	if (message.content === "que") {
		message.channel.send('so')
	}

    	if (message.content.startsWith("but")) {
		message.channel.send("Ooooh mis lentes de contactoo"); 
	}
	if (message.content.startsWith("when")) {
           	message.channel.send("El futuro és hoy, oiste viejo?")
	}
     if (message.content.includes('506565592757698600')) {
        message.react('788896686415413278'); //Yo
}       	  
	      if (message.content.includes('298333637265588225')) { 
	message.channel.send("Para la mayoria, un Tomy más. Para mi, mi mejor admin."); //timi
	      }
	if (message.content.includes('318841899601362967')) { 
		message.channel.send("Te están llamando maldito inutil (Jajashd naaa bro te tkm mucho uwu)"); 
	}
     if (message.content.includes('potato')) {
        message.react('762245669901565962'); //Yo
}       	  
     if (message.content.includes('553662317280362507')) {
         message.channel.send("Para algunos una persona. Para mi, mi primera experiencia con una verdadera chica gamer :pray::pray:"); 
     } 
	if (message.content.includes('740629590090973288')) {
        message.react('708663822373879838'); //Francy
}       	  	

	
     if (message.content.includes('708717695100780674')) {
        message.channel.send('dOu'); //Kemonito
}       
	 

     if (message.content.includes('746197116199632946')) {
        message.channel.send('Calla cagada'); //Un pibe random xD
}       			

	
     if (message.content.includes('587319206911934464')) {
        message.channel.send('gei');//Kaki
}       

	
     if (message.author.id == 689106697561702437) {
	     message.react('790644057734119484')
}


     if (message.content.includes('396839262311546891')) {
        message.react('708662800368533504');//josux
}       

     if (message.content.includes('569155437279051776')) {
	     message.react('786150806528589865')
     }
	
     if (message.channel.id == 707435459441328158) {
	     message.react('786219982496595988')//amén
     }

});	


client.database = Mongoose.connection;
client.database.on("error", err => {
  throw err;
});
client.database.once("open", async () => {
  require("./models");
  require("./handlers/eventHandler")(client);
  require("./handlers/moduleHandler")(client);
  client.login(process.env.BOT_TOKEN);
});
