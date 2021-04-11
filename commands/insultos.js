const insulter = require('insult');
const translate = require('translate'); 

module.exports = {
    name: 'insultos',
    descripcion: "¿Quiéres un insulto, pues toma insulto jueputa?",
    async execute(message, args){
        const insulto_es = await translate(insulter.Insult(), { to: "en", engine: "libre"});
        message.channel.send(insulto_es);    
    }
}