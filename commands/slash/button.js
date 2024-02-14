const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');

module.exports = {

	name: "button",
	description: "Give the ping",
	permissions: "Aucune",
	dm: true,
	category: "Usefull",

	async run(bot, interaction)
	{
		const previous = new ButtonBuilder()
			.setCustomId("previous")
			.setLabel("Previous")
			.setStyle(ButtonStyle.Primary)

		const next = new ButtonBuilder()
			.setCustomId("next")
			.setLabel("Next")
			.setStyle(ButtonStyle.Primary)

		const row = new ActionRowBuilder()
			.addComponents(previous, next)

		const response = interaction.reply({
			content : `Ping : ${bot.ws.ping}ms`,
			components: [row]
		});

		const collectorFilter = i => i.user.id === interaction.user.id;
		try{
			const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60_000 });

			if (confirmation.customId === "previous")
				await confirmation.update({ content: "Previous", components: [] });

			else if (confirmation.customId === "next")
				await confirmation.update({ content: "Next", components: [] });

		} catch (error) {
			await interaction.editReply({ content: "Time out", components: [] });
		}
	}
};
