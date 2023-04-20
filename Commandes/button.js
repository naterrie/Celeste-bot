const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');

module.exports = {

    name: "button",
    description: "test button",
    permissions: "Aucune",
    dm: true,

    async run(bot, interaction)
    {
        if (!interaction.isChatInputCommand()) return;

        const row = new ActionRowBuilder()
			.addComponents
            (
				new ButtonBuilder()
					.setCustomId('primary')
					.setLabel('In test')
					.setStyle(ButtonStyle.Primary)
                    .setDisabled(false),
			);
        await interaction.reply({ content: `Button :`, components: [row]});
    }
};
