const axios = require("axios");
const config = require("../../config.js");
const { EmbedBuilder } = require('discord.js');
const champname = require("../../champ.js");
const mongoose = require('mongoose');
const DB = require("../../mongoose.js");

module.exports = {
	name: "ingame",
	description: "Information about your game in progress",
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
			const player = await axios.get(`https://${config.region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${User.Puuid}?api_key=${config.token_riot}`);
			let match = await axios.get(`https://${config.region}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${player.data.id}?api_key=${config.token_riot}`);
			match.data.gameMode = match.data.gameMode.charAt(0).toUpperCase() + match.data.gameMode.slice(1).toLowerCase();
			let idchamp;
			let temp = 0;
			while (match.data.participants[temp] && match.data.participants[temp].summonerName != User.Name)
				temp++;
			idchamp = match.data.participants[temp].championId;
			const avatarUrl = `https://ddragon.leagueoflegends.com/cdn/11.1.1/img/profileicon/${player.data.profileIconId}.png`;
			let nb;
			while (match.data.participants[nb])
				nb++;
			nb = nb / 2;
			for (let i = 0; i < nb * 2; i++)
				match.data.participants[i].championId = champname[match.data.participants[i].championId];
			if (match.data.gameLength < 0)
				match.data.gameLength = 0;
			const embed = new EmbedBuilder()
				.setColor(0xCA335c)
				.setTitle(`Information sur la partie`)
				.addFields(
					{ name: "Mode de jeu", value : `${match.data.gameMode}`},
					{ name: "Durée de la partie", value : `${Math.floor(match.data.gameLength / 60)} minutes`},
					{ name: `${match.data.participants[0].summonerName} vs ${match.data.participants[5].summonerName}`, value: `${champname[match.data.participants[0].championId]} vs ${champname[match.data.participants[5].championId]}`},
					{ name: `${match.data.participants[1].summonerName} vs ${match.data.participants[6].summonerName}`, value: `${champname[match.data.participants[1].championId]} vs ${champname[match.data.participants[6].championId]}`},
					{ name: `${match.data.participants[2].summonerName} vs ${match.data.participants[7].summonerName}`, value: `${champname[match.data.participants[2].championId]} vs ${champname[match.data.participants[7].championId]}`},
					{ name: `${match.data.participants[3].summonerName} vs ${match.data.participants[8].summonerName}`, value: `${champname[match.data.participants[3].championId]} vs ${champname[match.data.participants[8].championId]}`},
					{ name: `${match.data.participants[4].summonerName} vs ${match.data.participants[9].summonerName}`, value: `${champname[match.data.participants[4].championId]} vs ${champname[match.data.participants[9].championId]}`},
				)
				.setThumbnail(avatarUrl)
				.setTimestamp()
			await interaction.reply({embeds: [embed]});
		} catch (error) {
			await interaction.reply({content : "Erreur, Joueur non trouvé, ou aucune partie en cours", ephemeral : true});
		}
	}
}
