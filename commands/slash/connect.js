const axios = require("axios");
const config = require("../../config.js");
const mongoose = require('mongoose');
const User = require("../../mongoose.js");

module.exports = {
	name: "connect",
	description: "Connect your profil",
	permissions: "Aucune",
	dm: true,
	category: "usefull",
	options: [
		{
			type: "string",
			name: "summoner",
			description: "Your summoner name",
			required: true
		}, {
			type: "string",
			name: "tag",
			description: "Your tag",
			required: true
		}, {
			type: "string",
			name: "region",
			description: "Your region",
			required: true
		},
	],
	async run(bot, interaction)
	{
		try {
			const summoner = interaction.options.getString("summoner");
			const tag = interaction.options.getString("tag");
			const region = interaction.options.getString("region");
			const PUUID = await axios.get(`https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summoner}/${tag}?api_key=${config.token_riot}`);
			const player = await axios.get(`https://${config.region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${PUUID.data.puuid}?api_key=${config.token_riot}`);

			try {
				const newUser = new User({
					DiscordId: interaction.user.id,
					Name: summoner,
					Tag: tag,
					Region: region,
					Puuid: PUUID.data.puuid,
					Id: player.data.accountId,
			});
			await newUser.save();
			await interaction.reply({ content: "Vous êtes désormais connecté", ephemeral: true });
		} catch (error) {
			await interaction.reply({ content: "Vous êtes déjà connecté", ephemeral: true });
		}
		} catch (error) {
			await interaction.reply({ content: "Erreur, Joueur non trouvé", ephemeral: true });
		}
	}
}
