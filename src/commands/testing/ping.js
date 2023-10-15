const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 20,
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!')
        .setDescriptionLocalizations({
            "es-ES": 'Contesta con "Hola!"'
        }),
    async execute(interaction) {
        const locales = { "es-ES": 'Hola!' };
        
        await interaction.reply(locales[interaction.locale] ?? 'Pong!');
    }
};