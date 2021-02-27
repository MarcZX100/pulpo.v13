module.exports = {
	name: 'penis',
	cooldown: 5,
	aliases: ['pp', 'pito', 'dick'],
	description: 'Penis!', 
  permissions: [],
	guildOnly: false,
  enabled: true,
  exec: async (client, message, args) => {
            var emcolor = [0]
    if (message.guild) emcolor = message.guild.me.displayHexColor
      
    if (!message.guild) emcolor = client.config.colors.general
    var facts = ["8D", "8=D", "8==D", "8===D", "8====D", "8=====D", "8======D", "8=======D", "8========D", "8=========D"];
    var fact = Math.floor(Math.random() * facts.length);

message.channel.send({embed: {
      color: emcolor,
     
      title: `*${message.author.username}\'s penis O.o*`,
      fields: [{
          name: facts[fact],
	  value: "_ _"
	    }
	 ],       
         timestamp: new Date(),
         footer: {
           text: "Nice penis bro 10/10"}
       }}	
   );
}
}
