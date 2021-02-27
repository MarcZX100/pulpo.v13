const Discord = require('discord.js')

var Color = require('color');
var colorname = require('color-name');/*
const co = "red"
    var color = Color(colorname.co)
    console.log(color.hex())
*/
module.exports = {
	name: 'color',
	cooldown: 5,
	aliases: ['colour', 'colorinfo', 'rgbcolor', 'hexcolor'],
	description: 'Displays a color with hex/rgb!', 
  permissions: [],
	guildOnly: false,
	enabled: true,
  exec: async (client, message, args) => {
   

    const co = args[0]
    var color = Color(co)
    console.log(color.hex())
    
    
 const colore = new Discord.MessageEmbed() 
            .setDescription(`Hex: \`#${color.hex}\`\nRGB: \`${color.red}, ${color.green}, ${color.blue}\`\nHSL: \`${color.hue}, ${color.saturation}, ${color.lightness}\``)
            .setImage(`http://placehold.it/500/${color.hex}/${color.hex}`)
            .setColor(`${color.hex}`)
    
message.channel.send(colore)


    
	},
};
