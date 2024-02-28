const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const DB = require("../mongoose.js");
const axios = require("axios");
const config = require("../config.js");
const { EmbedBuilder } = require("discord.js");
const champname = require("../champ.js");

module.exports = {

	async pageGeneration (interaction, index, author)
	{
		const User = await DB.findOne({DiscordId: author});
		if (!User)
			return interaction.reply({content : "Vous n'êtes pas connecté", ephemeral : true});

		const match = await axios.get(`https://${User.Region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${User.Puuid}/ids?api_key=${config.token_riot}`);
		const game = await axios.get(`https://${User.Region}.api.riotgames.com/lol/match/v5/matches/${match.data[index]}?api_key=${config.token_riot}`);

		game.data.info.gameMode = game.data.info.gameMode.charAt(0).toUpperCase() + game.data.info.gameMode.slice(1).toLowerCase()
		let temp = 0;
		while (game.data.info.participants[temp] && game.data.info.participants[temp].riotIdGameName != User.Name)
			temp++;
		const url = `https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${champname[game.data.info.participants[temp].championId]}.png`;

		let color;
		if (game.data.info.participants[temp].win)
			color = 0x00FF00;
		else
			color = 0xFF0000;

		const embed = new EmbedBuilder()
			.setColor(color)
			.setDescription(`Partie ${index+1}/${match.data.length}`)
			.setTitle(`Information sur la partie`)
			.addFields(
				{ name: "Mode de jeu", value : `${game.data.info.gameMode}`},
				{ name: "Durée de la partie", value : `${Math.floor(game.data.info.gameDuration / 60)} minutes`},
				{ name: `${game.data.info.participants[0].riotIdGameName} vs ${game.data.info.participants[5].riotIdGameName}`, value: `${champname[game.data.info.participants[0].championId]} vs ${champname[game.data.info.participants[5].championId]}`},
				{ name: `${game.data.info.participants[1].riotIdGameName} vs ${game.data.info.participants[6].riotIdGameName}`, value: `${champname[game.data.info.participants[1].championId]} vs ${champname[game.data.info.participants[6].championId]}`},
				{ name: `${game.data.info.participants[2].riotIdGameName} vs ${game.data.info.participants[7].riotIdGameName}`, value: `${champname[game.data.info.participants[2].championId]} vs ${champname[game.data.info.participants[7].championId]}`},
				{ name: `${game.data.info.participants[3].riotIdGameName} vs ${game.data.info.participants[8].riotIdGameName}`, value: `${champname[game.data.info.participants[3].championId]} vs ${champname[game.data.info.participants[8].championId]}`},
				{ name: `${game.data.info.participants[4].riotIdGameName} vs ${game.data.info.participants[9].riotIdGameName}`, value: `${champname[game.data.info.participants[4].championId]} vs ${champname[game.data.info.participants[9].championId]}`},
			)
			.setThumbnail(url)
			.setTimestamp()

		let previous;
		let next;
		if (index === 0)
		{
			previous = new ButtonBuilder()
				.setCustomId(`previous-${author}-${index}`)
				.setLabel("Previous")
				.setStyle(ButtonStyle.Secondary)
				.setDisabled(true)
		}
		else
		{
			previous = new ButtonBuilder()
				.setCustomId(`previous-${author}-${index-1}`)
				.setLabel("Previous")
				.setStyle(ButtonStyle.Secondary)
		}
		if (index === 19)
		{
			next = new ButtonBuilder()
			.setCustomId(`next-${author}-${index+1}`)
			.setLabel("Next")
			.setStyle(ButtonStyle.Secondary)
			.setDisabled(true)
		}
		else
		{
			next = new ButtonBuilder()
				.setCustomId(`next-${author}-${index+1}`)
				.setLabel("Next")
				.setStyle(ButtonStyle.Secondary)
		}
		const row = new ActionRowBuilder()
			.addComponents(previous, next)
		await interaction.edit({embeds: [embed], components : [row]});
	},
}

