module.exports = {

	name: "down",
	description: "Down the bot",
	permissions: "Aucune",
	dm: true,
	category: "Usefull",

	async run(bot, interaction)
	{
		if(interaction.user.id === bot.ownerID  || interaction.user.id === bot.ownerOther)
		{
			await interaction.reply({ content: "Shutting down...", ephemeral: true });
			process.exit();
		}
		else
		{
			await interaction.reply({ content: "You are not the owner of the bot", ephemeral: true });
		}
	}
};
