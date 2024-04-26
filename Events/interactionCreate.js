const Discord = require("discord.js");
const { pageGeneration } = require("../utils/pageGeneration.js");

module.exports = async (bot, interaction) => {

	if (interaction.isButton())
	{

		const [a, b, index] = interaction.component.customId.split("-")
		if (interaction.isButton() && interaction.customId === `previous-${interaction.user.id}-${index}`)
		{
			await interaction.deferUpdate();
			return pageGeneration(interaction.message, parseInt(index), interaction.user.id);
		}

		else if (interaction.isButton() && interaction.customId === `next-${interaction.user.id}-${index}`)
		{
			await interaction.deferUpdate();
			return pageGeneration(interaction.message, parseInt(index), interaction.user.id);
		}

		else
			return await interaction.reply({content: "Seul l'utilisateur peu changer la page", ephemeral: true});
	}

	else if(interaction.type === Discord.InteractionType.ApplicationCommand)
	{
		let command = require(`../commands/slash/${interaction.commandName}`);
		command.run(bot, interaction, command.options);
	}
};
