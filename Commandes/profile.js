const { EmbedBuilder } = require('discord.js')

module.exports = {

    name: "profile",
    description: "in dev",
    permissions: "Aucune",
    dm: true,
    category: "Usefull",

    async run(bot, interaction) {

        try {
        if(interaction.member.nickname === null) {
            interaction.member.nickname = "Aucun";
        }
        const embed = new EmbedBuilder()
			.setColor(0xCA335c)
            .setTitle(`What about you ?`)
            .addFields(
                { name: "Nickname", value : `${interaction.user.username}`, inline: true },
                { name: "Tag", value : `#${interaction.user.discriminator}`, inline: true },
                { name: "Nickname", value : `${interaction.member.nickname}`, inline: true },
            )
            .setThumbnail(interaction.user.displayAvatarURL())
            .setTimestamp(interaction.member.joinedTimestamp)
            .setFooter({text : "You've join the server the"})
            await interaction.reply({content : `${interaction.user.banner}`, embeds: [embed]},)
        } catch (err) {
            const embed = new EmbedBuilder()
			.setColor(0xCA335c)
            .setTitle(`What about you ?`)
            .addFields(
                { name: "Nickname", value : `${interaction.user.username}`, inline: true },
                { name: "Tag", value : `#${interaction.user.discriminator}`, inline: true },
            )
            .setThumbnail(interaction.user.displayAvatarURL())
            .setTimestamp()
            await interaction.reply({content : `${interaction.user.banner}`, embeds: [embed]},)

        }
    }
}