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
		try
		{
			let index = 0;
			const User = await DB.findOne({DiscordId: interaction.user.id});
			if (!User)
			{
				await interaction.reply({content : "Vous n'êtes pas connecté", ephemeral : true});
				return ;
			}
			const match = await axios.get(`https://${User.Region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${User.Puuid}/ids?api_key=${config.token_riot}`);
			const game = await axios.get(`https://${User.Region}.api.riotgames.com/lol/match/v5/matches/${match.data[index]}?api_key=${config.token_riot}`);
			game.data.info.gameMode = game.data.info.gameMode.charAt(0).toUpperCase() + game.data.info.gameMode.slice(1).toLowerCase()
			let temp = 0;
			while (game.data.info.participants[temp] && game.data.info.participants[temp].riotIdGameName != User.Name)
				temp++;
			const url = `https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${champname[game.data.info.participants[temp].championId]}.png`;
			const embed = new EmbedBuilder()
				.setColor(0xCA335c)
				.setTitle(`Information sur la partie`)
				.addFields(
					{ name: "Mode de jeu", value : `${game.data.info.gameMode}`},
					{ name: "Durée de la partie", value : `${Math.floor(game.data.info.gameDuration / 60)} minutes`},
					{ name: `${game.data.info.participants[0].summonerName} vs ${game.data.info.participants[5].summonerName}`, value: `${champname[game.data.info.participants[0].championId]} vs ${champname[game.data.info.participants[5].championId]}`},
					{ name: `${game.data.info.participants[1].summonerName} vs ${game.data.info.participants[6].summonerName}`, value: `${champname[game.data.info.participants[1].championId]} vs ${champname[game.data.info.participants[6].championId]}`},
					{ name: `${game.data.info.participants[2].summonerName} vs ${game.data.info.participants[7].summonerName}`, value: `${champname[game.data.info.participants[2].championId]} vs ${champname[game.data.info.participants[7].championId]}`},
					{ name: `${game.data.info.participants[3].summonerName} vs ${game.data.info.participants[8].summonerName}`, value: `${champname[game.data.info.participants[3].championId]} vs ${champname[game.data.info.participants[8].championId]}`},
					{ name: `${game.data.info.participants[4].summonerName} vs ${game.data.info.participants[9].summonerName}`, value: `${champname[game.data.info.participants[4].championId]} vs ${champname[game.data.info.participants[9].championId]}`},
				)
				.setThumbnail(url)
				.setTimestamp()
			await interaction.reply({embeds: [embed]});
		}
		catch (error)
		{
			await interaction.reply({content : "Erreur, Joueur non trouvé", ephemeral : true});
			console.log(error);
		}
	}
}
