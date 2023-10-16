const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { color } = require('../../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Shows detailed info of a user')
        .setDescriptionLocalizations({
            "es-ES": 'Muestra información detallada de un usuario'
        }),
    async execute(interaction) {
        const user = interaction.user;
        const member = await interaction.guild.members.fetch(user.id);
        const memberRoles = member.roles.cache
            .filter((roles) => roles.id !== interaction.guild.id)
            .map((role) => role.toString());

        const userEmbed = new EmbedBuilder()
            .setTitle(member.nickname)
            .setDescription(
                `**User information**
                **ID:** ${user.id}
                **User:** ${user.tag}
                **Name:** ${user.displayName}
                **Nickname:** ${member.nickname}`
            )
            .addFields(
                { name: "Discord Membership", value: `<t:${parseInt(user.createdTimestamp / 1000)}:f> (<t:${parseInt(user.createdTimestamp / 1000)}:R>)` },
                { name: `${interaction.guild.name}'s Membership`, value: `<t:${parseInt(member.joinedTimestamp / 1000)}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)` },
                { name: "Roles", value: `${memberRoles}` }
            )
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .setImage(user.bannerURL({ dynamic: true, size: 512 }))
            .setColor(color)
        
        await interaction.reply({ embeds: [userEmbed] });
    }
};