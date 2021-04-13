const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'help',
    category: 'info',
    descripcion: "Guía de todas las instrucciones que puedes realizar:",
    execute(message, args){
        const embed = new MessageEmbed()
        .setAuthor(message.author.username)
        .setDescription("Informe de los comandos que puedes realizar.")
        .setColor("RANDOM")
        .addField("Info", '*help - Get some help.')
        .addField("Fun", '*puto - Free blowjobs.')

    message.channel.send(embed);
    }
};

