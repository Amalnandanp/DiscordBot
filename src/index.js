require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');
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
client.on('interactionCreate', async (interaction) => {
    try{
     if(!interaction.isButton()) return;
     await interaction.deferReply({
         ephemeral:true,
     });
     const role = interaction.guild.roles.cache.get(interaction.customId);
     if(!role){
         interaction.editReply({
             content:'I couldnt find the role',
         })
         return
     }
     const  hasRole = interaction.member.roles.cache.has(role.id);
     if(hasRole){
         await interaction.member.roles.remove(role);
         await interaction.editReply(`The role ${role} has been removed.`);
         return
     }
     await interaction.member.roles.add(role);
     await interaction.editReply(`The role ${role} has been added.`);
    } catch(error){
     console.log(error);
     
    }
 })
// client.on('messageCreate', (message) => {
//     // console.log(message.content);
//     if (message.author.bot) {
//         return;
//     }
//     if (message.content == 'hey') {
//         message.reply(`Hello ${message.author} what can i do for you? 😊`);
//     }

// });
// client.on('interactionCreate', (interaction) => {
//     if (!interaction.isChatInputCommand()) return;
    // if (interaction.commandName === 'embed') {
    //     const embed = new EmbedBuilder()
    //         .setTitle("Embed Title")
    //         .setDescription('This is Embed Description')
    //         .setColor('Random')
    //         .addFields(
    //             {
    //                 name: 'Field title',
    //                 value: 'Some Random value',
    //                 inline: true,
    //             },
    //             {
    //                 name: 'Field title 2',
    //                 value: 'Some Random value',
    //                 inline: true,
    //             }
    //         );
    //     interaction.reply({ embeds: [embed] })
    // }
    // console.log(interaction.commandName);
    // if(interaction.commandName === 'hey'){
    //     interaction.reply('hey!')
    // }
    // if(interaction.commandName === 'ping'){
    //     interaction.reply('pong!')
    // }
    // if(interaction.commandName === 'add'){
    //     const num1 = interaction.options.get('first-number')?.value;
    //     const num2 = interaction.options.get('second-number')?.value;
    //     interaction.reply(`The Sum is ${num1 + num2}`)
    // }
    // })
    // client.on('messageCreate', (message) => {
    //     if (message.content === 'embed') {
    //         const embed = new EmbedBuilder()
    //         .setTitle("Embed Title")
    //         .setDescription('This is Embed Description')
    //         .setColor('Random')
    //         .addFields(
    //             {
    //                 name: 'Field title',
    //                 value: 'Some Random value',
    //                 inline: true,
    //             },
    //             {
    //                 name: 'Field title 2',
    //                 value: 'Some Random value',
    //                 inline: true,
    //             }
    //         );
    //         message.channel.send({embeds: [embed]})
    //     }
// })
client.login(process.env.TOKEN);
