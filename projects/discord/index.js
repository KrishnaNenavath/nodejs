// import { Client, GatewayIntentBits } from 'discord.js';
const { Client, GatewayIntentBits } = require('discord.js');

// Your code using Client and GatewayIntentBits here

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on("messageCreate", (message)=>{
    if(message.author.bot) return;
    if(message.content.startsWith("create")){
        const url = message.content.split("create")[1]
        return message.reply({
            content: "Generating short ID for "+ url,
        })
    }
    message.reply({
        content:"Hi from Bot!"})
    console.log(message.content)
})

client.on('interactionCreate', (interaction)=>{
    console.log(interaction)
    interaction.reply("Pong!!")

})

client.login("MTI1MjYyMzE3MTA2OTI4MDM5Ng.GoV4Th.CgOoAP2kLvyskgx2_WmC6Quw-8gFAsmYbGVA3I")