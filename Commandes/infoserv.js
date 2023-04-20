const { EmbedBuilder } = require('discord.js');

module.exports = {

    name: "infoserv",
    description: "Give information about the server",
    permissions: "Aucune",
    dm: false,
    category: "Usefull",


    async run(bot, interaction)
    {
        const embed = new EmbedBuilder()
            .setColor(0xCA335c)
            .setTitle(`A propos du serveur`)
            .addFields(
                { name: "Nombre de membres", value: `${interaction.guild.memberCount}`},
                { name: "Nom du serveur", value: `${interaction.guild.name}`},
                { name: "Owner", value : `<@${interaction.guild.ownerId}>`},
                { name: "Image :", value: " "},
                )
            .setImage(interaction.guild.iconURL())
            .setTimestamp(interaction.guild.createdAt)
            .setFooter({text : "serveur crée le"});
        await interaction.reply({embeds: [embed]});
    }
};
