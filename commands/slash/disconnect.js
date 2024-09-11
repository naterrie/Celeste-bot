const User = require("../../mongoose.js");

module.exports = {
	name: "disconnect",
	description: "Disconnect your profil",
	permissions: "Aucune",
	dm: true,
	category: "usefull",

	async run(bot, interaction)
	{
		const user = await User.findOne({ DiscordId: interaction.user.id });
		if (user)
		{
			await User.deleteOne({ DiscordId: interaction.user.id });
			await interaction.reply({ content: "Vous êtes désormais déconnecté", ephemeral: true });
		}
		else
			await interaction.reply({ content: "Vous n'êtes pas connecté", ephemeral: true });
	}
}
