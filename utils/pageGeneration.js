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

		if (game.data.info.queueId === 420)
			game.data.info.gameMode = "Ranked Solo/Duo";
		else
			game.data.info.gameMode = game.data.info.gameMode.charAt(0).toUpperCase() + game.data.info.gameMode.slice(1).toLowerCase()

		let temp = 0;
		while (game.data.info.participants[temp] && game.data.info.participants[temp].riotIdGameName != User.Name)
			temp++;
		const url = `https://ddragon.leagueoflegends.com/cdn/${config.version}/img/champion/${champname[game.data.info.participants[temp].championId]}.png`;

		let color;
		if (game.data.info.participants[temp].win)
		{
			game.data.info.gameMode = `Victory in ${game.data.info.gameMode}`
			color = 0x00FF00;
		}
		else
		{
			game.data.info.gameMode = `Defeat in ${game.data.info.gameMode}`
			color = 0xFF0000;
		}

		let kda = [];
		for (let i = 0; i < 10; i++)
			kda[i] = `${game.data.info.participants[i].kills}/${game.data.info.participants[i].deaths}/${game.data.info.participants[i].assists}`;

		let champions = [];
		for (let i = 0; i < 10; i++)
			champions[i] = champname[game.data.info.participants[i].championId];

		let player = [];
		for (let i = 0; i < 10; i++)
			player[i] = game.data.info.participants[i].riotIdGameName;

			const embed = new EmbedBuilder()
			.setColor(color)
			.setDescription(`Partie ${index+1}/${match.data.length}`)
			.setTitle(`Information sur la partie`)
			.addFields(
				{ name: "Mode de jeu", value : `${game.data.info.gameMode}`, inline : true},
				{ name: "Durée de la partie", value : `${Math.floor(game.data.info.gameDuration / 60)}m${Math.ceil(game.data.info.gameDuration / 60)}`, inline : true},
				{ name: `${player[0]} vs ${player[5]}`, value: `${champions[0]} ${kda[0]} vs ${champions[5]} ${kda[5]}`},
				{ name: `${player[1]} vs ${player[6]}`, value: `${champions[1]} ${kda[1]} vs ${champions[6]} ${kda[6]}`},
				{ name: `${player[2]} vs ${player[7]}`, value: `${champions[2]} ${kda[2]} vs ${champions[7]} ${kda[7]}`},
				{ name: `${player[3]} vs ${player[8]}`, value: `${champions[3]} ${kda[3]} vs ${champions[8]} ${kda[8]}`},
				{ name: `${player[4]} vs ${player[9]}`, value: `${champions[4]} ${kda[4]} vs ${champions[9]} ${kda[9]}`},
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
		await interaction.edit({content: "", embeds: [embed], components : [row]});
	},
}

