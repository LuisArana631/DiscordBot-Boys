const insulter = require('insult'); 

module.exports = {
    name: 'insultos',
    category: 'fun',
    descripcion: "¿Quiéres un insulto, pues toma insulto jueputa?",
    execute(message, args){
        message.channel.send(insulter.Insult()); 
    }
};