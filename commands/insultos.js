const insulter = require('insult'); 

module.exports = {
    name: 'insultos',
    descripcion: "¿Quiéres un insulto, pues toma insulto jueputa?",
    async execute(message, args){
        message.channel.send(insulter.Insult()); 
    }
};