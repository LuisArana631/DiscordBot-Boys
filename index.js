/* IMPORTS */
require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs');
const ytdl = require('ytdl-core');

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
var servers = {

};

/* LEVANTAR BOT */
client.once('ready', () => {
    console.log('BoysBot online!');
    
    /* AGREGAR ESTADO */
    client.user.setPresence({
        activity: {
            name: `Use ${prefijo}help for help`
        }
    });
});

/* COMANDOS */
client.on('message', message => {
    if(!message.content.startsWith(prefijo) || message.author.bot )return;

    const args = message.content.slice(prefijo.length).split(/ +/);
    const command = args.shift().toLowerCase();

    switch (command) {
        case 'music':
            function play(connection, message){
                var server = servers[message.guild.id];
                server.dispatcher = connection.play(ytdl(server.queue[0], {
                    filter: "audioonly"
                }));

                server.queue.shift();

                server.dispatcher.on("end", function(){
                    if(server.queue[0]){
                        play(connection, message);
                    } else {
                        connection.disconnect();
                    }
                });
            }

            /* VALIDAR QUE VENGA LINK */
            if (!args[0]){
                message.channel.send('You need to provide a link');
                return;  
            }

            /* VALIDAR QUE SE ENCUENTRE EN UN CANAL */
            if (!message.member.voice.channel){
                message.channel.send('You must be in a channel to play some fucking music bro!');
                return;
            }

            if (!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            }

            var server = servers[message.guild.id];

            server.queue.push(args[1]);

            if (!message.guild.voice) message.member.voice.channel.join().then(function(connection){
                play(connection, message);
            });

            break;        
        case 'puto':
            client.commands.get('insultos').execute(message, args);
            break;
        case 'help':
            client.commands.get('help').execute(message, args);
            break;
    }
    
});

client.login(process.env.CLIENT_TOKEN);