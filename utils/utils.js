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

		const embed = new EmbedBuilder()
			.setColor(color)
			.setDescription(`Partie ${index+1}/${match.data.length}`)
			.setTitle(`Information sur la partie`)
			.addFields(
				{ name: "Mode de jeu", value : `${game.data.info.gameMode}`, inline : true},
				{ name: "Durée de la partie", value : `${Math.floor(game.data.info.gameDuration / 60)}m${Math.ceil(game.data.info.gameDuration / 60)}`, inline : true},
				{ name: `${game.data.info.participants[0].riotIdGameName} vs ${game.data.info.participants[5].riotIdGameName}`, value: `${champname[game.data.info.participants[0].championId]} ${kda[0]} vs ${champname[game.data.info.participants[5].championId]} ${kda[5]}`},
				{ name: `${game.data.info.participants[1].riotIdGameName} vs ${game.data.info.participants[6].riotIdGameName}`, value: `${champname[game.data.info.participants[1].championId]} ${kda[1]} vs ${champname[game.data.info.participants[6].championId]} ${kda[6]}`},
				{ name: `${game.data.info.participants[2].riotIdGameName} vs ${game.data.info.participants[7].riotIdGameName}`, value: `${champname[game.data.info.participants[2].championId]} ${kda[2]} vs ${champname[game.data.info.participants[7].championId]} ${kda[7]}`},
				{ name: `${game.data.info.participants[3].riotIdGameName} vs ${game.data.info.participants[8].riotIdGameName}`, value: `${champname[game.data.info.participants[3].championId]} ${kda[3]} vs ${champname[game.data.info.participants[8].championId]} ${kda[8]}`},
				{ name: `${game.data.info.participants[4].riotIdGameName} vs ${game.data.info.participants[9].riotIdGameName}`, value: `${champname[game.data.info.participants[4].championId]} ${kda[4]} vs ${champname[game.data.info.participants[9].championId]} ${kda[9]}`},
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

