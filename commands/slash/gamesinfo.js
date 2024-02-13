const axios = require("axios");
const config = require("../../config.js");
const { EmbedBuilder } = require('discord.js');
const champname = require("../../champ.js");
const mongoose = require('mongoose');
const DB = require("../../mongoose.js");

module.exports = {
	name: "gamesinfo",
	description: "Get stats of your games",
	permissions: "Aucune",
	dm: true,
	category: "usefull",

	async run(bot, interaction)
	{
		try {
			const User = await DB.findOne({DiscordId: interaction.user.id});
		if (!User)
		{
			await interaction.reply({content : "Vous n'êtes pas connecté", ephemeral : true});
			return ;
		}
		const match = await axios.get(`https://${User.Region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${User.Puuid}/ids?api_key=${config.token_riot}`);
		const game = await axios.get(`https://${User.Region}.api.riotgames.com/lol/match/v5/matches/${match.data[0]}?api_key=${config.token_riot}`);
		console.log(game);
		await interaction.reply({content : "Je taff dessus", ephemeral : true});
		} catch (error) {
			await interaction.reply({content : "Erreur, Joueur non trouvé", ephemeral : true});
			console.log(error);
		}
	}
}
