const { PermissionsBitField } = require('discord.js')
const Discord = require("discord.js")

module.exports = {

    name: "delete",
    description: "delete messages",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category: "Mod",
    options: [
        {
            type: "number",
            name: "nombre",
            description: "Nombre de messages à supprimer",
            required: true
        }
    ],

    async run(bot, interaction, args) {

        let number = interaction.options.getNumber("nombre")

        try {
		await interaction.channel.bulkDelete(parseInt(number))
        await interaction.reply({ content: `${number} messages supprimés`, ephemeral: true })
        } catch (error) {
            await interaction.reply({ content: "Des messages trop vieux ont essayé d'être supprimés", ephemeral: true })
        }
    }
}
