const axios = require("axios");
const config = require("../../config.js");
const DB = require("../../mongoose.js");

module.exports = {

	name: "update",
	description: "Update your profil",
	permissions: "Aucune",
	dm: true,
	category: "usefull",

	async run(bot, interaction)
	{
		try
		{
			const User = await DB.findOne({DiscordId: interaction.user.id});
			if (!User)
				await interaction.reply({content : "Vous n'êtes pas connecté", ephemeral : true});

			const update = await axios.get(`https://${User.Region}.api.riotgames.com/riot/account/v1/accounts/by-puuid/${User.Puuid}?api_key=${config.token_riot}`)
			User.Name = update.data.gameName;
			User.Tag = update.data.tagLine;
			await User.save();
			await interaction.reply({content : "Profil mis à jour", ephemeral : true});

		}catch (error)
		{
			await interaction.reply({ content: "Erreur, Joueur non trouvé", ephemeral: true });
		}
	}
}
