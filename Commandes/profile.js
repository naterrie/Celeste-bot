const { EmbedBuilder } = require('discord.js')

module.exports = {

    name: "profile",
    description: "Give information about you",
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
			.setTitle(`A propos de toi`)
			.addFields(
			    { name: "Username", value : `${interaction.user.username}`, inline: true },
			    { name: "Tag", value : `#${interaction.user.discriminator}`, inline: true },
			    { name: "Nickname", value : `${interaction.member.nickname}`, inline: true },
			    { name: "Création", value : `${interaction.user.createdAt}`},
                { name: "Avatar", value : ` `},
                      )
            .setImage(interaction.user.displayAvatarURL())
            .setTimestamp(interaction.member.joinedTimestamp)
            .setFooter({text : "Tu as rejoins le"})
            await interaction.reply({embeds: [embed]})
        } catch (err) {
            const embed = new EmbedBuilder()
			.setColor(0xCA335c)
            .setTitle(`A propos de toi`)
            .addFields(
                { name: "Username", value : `${interaction.user.username}`, inline: true },
                { name: "Tag", value : `#${interaction.user.discriminator}`, inline: true },
                { name: "Création", value : `${interaction.user.createdAt}`},
                { name: "Avatar", value : ` `},
            )
            .setImage(interaction.user.displayAvatarURL())
            .setTimestamp()
            await interaction.reply({embeds: [embed]})
        }
    }
}
