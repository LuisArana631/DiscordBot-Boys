/* IMPORTS */
require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs');

/* CODIGO GENERAL */
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

/* COMANDOS PREFIJO */
const prefijo = '-';

/* LEVANTAR BOT */
client.once('ready', () => {
    console.log('BoysBot online!');
});

/* COMANDOS */
client.on('message', message => {
    if(!message.content.startsWith(prefijo) || message.author.bot )return;

    const args = message.content.slice(prefijo.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if( command === 'puto' ){
        client.commands.get('insultos').execute(message, args);
    }
});

client.login(process.env.CLIENT_TOKEN);