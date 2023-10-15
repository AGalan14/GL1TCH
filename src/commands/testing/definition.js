const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('urban-definition')
        .setDescription("I'll search the definition of your word provided inside the urban dictionary")
        .setDescriptionLocalizations({
            "es-ES": 'Buscaré la definición de la palabra que menciones dentro del diccionario urbano (en inglés)'
        })
        .addStringOption(option => option
            .setName("term")
            .setDescription("Term I'll search")
            .setNameLocalizations({
                "es-ES": 'término'
            })
            .setDescriptionLocalizations({
                "es-ES": 'Término que buscaré'
            })
            .setRequired(true)
        ),
    async execute(interaction) {
        const term = interaction.options.getString("term");
        const query = new URLSearchParams({ term });
        const url_api = `https://api.urbandictionary.com/v0/define?${query}`;
        const response = await axios.get(url_api);
        const { list } = await response.data;

        // Locales
        let not_found = `Results for **${term}** not found.`;
        let definition = "Definition";
        let example = "Example";
        if(interaction.locale == "es-ES") {
            not_found = `No se encontró resultados para **${term}**.`;
            definition = "Definición";
            example = "Ejemplo";
        };

        // Term not found
        if(!list.length) return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(not_found)
            ],
            ephemeral: true
        })

        const [answer] = list;
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setTitle(answer.word)
                .setURL(answer.permalink)
                .addFields(
                    { name: definition, value: answer.definition.substring(0, 1024) },
                    { name: 'Example', value: answer.example.substring(0, 1024) },
                )
                .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Urban_Dictionary_logo.svg/768px-Urban_Dictionary_logo.svg.png")
            ]
        });
    }
};