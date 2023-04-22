const { PermissionsBitField } = require('discord.js');
const Discord = require("discord.js");

module.exports = {

    name: "delete",
    description: "delete messages",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category: "Mod",
    options: [
        {
            type: "number",
            name: "number",
            description: "number of message to delete",
            required: true
        }
    ],

    async run(bot, interaction, args)
    {
        let number = interaction.options.getNumber("numbre");

        if (interaction.guildId === "382938797442334720")
            return await interaction.reply({ content: "Pas sur ce serveur", ephemeral: true });
        try
        {
		    await interaction.channel.bulkDelete(parseInt(number));
            await interaction.reply({ content: `${number} messages supprimés`, ephemeral: true });
        }
        catch (error)
        {
                await interaction.reply({ content: "Des messages trop vieux ont essayé d'être supprimés", ephemeral: true });
        }
    }
};
