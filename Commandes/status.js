const { EmbedBuilder, DiscordjsErrorCodes } = require('discord.js')
const { Client, GatewayIntentBits, ActivityType } = require('discord.js')
const Discord = require("discord.js")



module.exports = {

    name: "status",
    description: "in dev",
    permissions: "Aucune",
    dm: true,
    category: "Usefull",

    async run(bot, interaction, client) {

        const embed = new EmbedBuilder()
			.setColor(0xCA335c)
            .setTitle(`My status is set !`)
            .setThumbnail(bot.user.displayAvatarURL())
            .setTimestamp()

            if(interaction.member.user.id !== bot.ownerID) { return interaction.reply({ content: "Only the owner of the bot can do this", ephemeral: true })}

            if(interaction.member.user.id === bot.ownerID) { bot.user.setPresence({ activities: [{ name: `Adenumy doingt things`, type: ActivityType.Watching }], status: 'dnd' }); await interaction.reply({embeds: [embed]})}}
}