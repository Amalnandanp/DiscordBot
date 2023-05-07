require('dotenv').config();
const {Client, IntentsBitField} = require('discord.js');
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
})
client.on('ready', (c) => {
    console.log(`🤖 ${c.user.username} is 🟢 online`)
 
})
client.on('messageCreate' , (message) => {
    // console.log(message.content);
    if(message.author.bot){
        return;
    }
    if(message.content == 'hey'){
        message.reply(`Hello ${message.author} what can i do for you? 😊`);
    }
    
});
client.on('interactionCreate', (interaction) => {
    if(!interaction.isChatInputCommand()) return;
    console.log(interaction.commandName);
    if(interaction.commandName === 'hey'){
        interaction.reply('hey!')
    }
    if(interaction.commandName === 'ping'){
        interaction.reply('pong!')
    }
})
client.login(process.env.TOKEN);