const Discord = require('discord.js');
const fs = require('fs');
require('dotenv').config();

const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMembers,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.GuildVoiceStates,
        Discord.GatewayIntentBits.GuildMessageReactions,
        Discord.GatewayIntentBits.GuildEmojisAndStickers,
    ],
    partials: [Discord.Partials.User, Discord.Partials.Channel, Discord.Partials.GuildMember, Discord.Partials.Message, Discord.Partials.Reaction]
});

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

// Handlers
fs.readdirSync('./src/handlers').forEach(handler => {
    try {
        require(`./handlers/${handler}`)(client, Discord);
    } catch (error) {
        console.log(`⚠️ Error when loading ${handler} handler`);
        console.error(error);
    };
});

client.login(process.env.TOKEN);