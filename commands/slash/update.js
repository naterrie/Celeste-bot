const axios = require("axios");
const config = require("../../config.js");
const DB = require("../../mongoose.js");
const { errBot } = require("../../utils/error.js");

module.exports = {

	name: "update",
	description: "Update your profil",
	permissions: "Aucune",
	dm: true,
	category: "usefull",

	async run(bot, interaction)
	{
		const User = await DB.findOne({DiscordId: interaction.user.id});
		if (!User)
			await interaction.reply({content : "Vous n'êtes pas connecté", ephemeral : true});

		const update = await axios.get(`https://${User.Region}.api.riotgames.com/riot/account/v1/accounts/by-puuid/${User.Puuid}?api_key=${config.token_riot}`)
		if (update.status != 200)
			return errBot(update.status, bot, interaction);
		User.Name = update.data.gameName;
		User.Tag = update.data.tagLine;
		await User.save();
		await interaction.reply({content : "Profil mis à jour", ephemeral : true});
	}
}
