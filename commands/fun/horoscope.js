module.exports = {
	name: 'horoscope',
	cooldown: 5,
	aliases: ['zodiac'],
	description: 'Displays the horoscope of someone!', 
  permissions: [],
	guildOnly: false,
	enabled: true,
  exec: async (client, message, args) => {

if(message.author.id == "689106697561702437") {
	let luck = "100"
	let health = "100"
	let money = "100"
        let love = "100"
        message.channel.send(`> ${message.author} here's your horoscope: \n*Luck:* **${luck}**| *Health:* **${health}**| *Love:* **${love}**| *Money:* **${money}**`)

	};
if(message.author.id !== "689106697561702437") {
	
 let luck = Math.floor((Math.random() * 100) + 1);
 let health = Math.floor((Math.random() * 100) + 1);
 let money = Math.floor((Math.random() * 100) + 1);
 let love = Math.floor((Math.random() * 100) + 1);
  message.channel.send(`> ${message.author} here's your horoscope: \n*Luck:* **${luck}**| *Health:* **${health}**| *Love:* **${love}**| *Money:* **${money}**`)

}



}}
