const { pageGeneration } = require("../../utils/pageGeneration.js");
const { errBot } = require("../../utils/error.js");

module.exports = {
	name: "gamesinfo",
	description: "Get stats of your games",
	permissions: "Aucune",
	dm: true,
	category: "usefull",

	async run(bot, interaction)
	{
		try
		{
			let index = 0;
			let author = interaction.user.id;
			let message = await interaction.reply({content : "Veuillez patienter",});
			pageGeneration(message, index, author);
		}
		catch (error)
		{
			await errBot(error, bot, interaction);
		}
	}
}
