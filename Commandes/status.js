const { EmbedBuilder, DiscordjsErrorCodes } = require('discord.js')
const { Client, GatewayIntentBits, ActivityType } = require('discord.js')
const Discord = require("discord.js")



module.exports = {

    name: "status",
    description: "in dev",
    permissions: "Aucune",
    dm: true,
    category: "Usefull",
    options: [
        {
            type: "string",
            name: "status",
            description: "status to set",
            required: true
        }, {
            type: "string",
            name: "type",
            description: "Type of status",
            required: true
        }, {
            type: "string",
            name: "disponibility",
            description: "Set the disponibility",
            required: true
        }
    ],

    async run(bot, interaction, client, args)
    {
        if(interaction.user.id === bot.ownerID  || interaction.user.id === bot.ownerOther)
        {
            let status = interaction.options.get("status").value;
            let TypeStatus = interaction.options.get("type").value;
            let TypeDisponibility = interaction.options.get("disponibility").value;

            if(TypeDisponibility !== "idle" && TypeDisponibility !== "online" && TypeDisponibility !== "dnd" && TypeDisponibility !== "invisible")
                return interaction.reply({ content: "Merci de respecter le type de status", ephemeral : true,});
            if(TypeStatus !== "Watching" && TypeStatus !== "Playing" && TypeStatus !== "Streaming" && TypeStatus !== "Listening" && TypeStatus !== "Competiting")
                    return interaction.reply({ content: "Merci de respecter le type d'activité !", ephemeral: true });
            bot.user.setPresence(
            {
                activities: [{ name: status, type: ActivityType[TypeStatus]}],
                status: TypeDisponibility });

                const embed = new EmbedBuilder()
                    .setColor(0xCA335c)
                    .setTitle(`My status is set !`)
                    .setThumbnail(bot.user.displayAvatarURL())
                    .setTimestamp()
                    .addFields
                    (
                        { name: 'status', value: `${status}`, inline: true },
                        { name: 'type', value: `${TypeStatus}`, inline: true },
                        { name: 'Disponibility', value: `${TypeDisponibility}`, inline: true },
                    )
            await interaction.reply({embeds: [embed], ephemeral: true})
        }
        else
            return interaction.reply({ content: "Only the owner of the bot can do this", ephemeral: true })
    }
}
