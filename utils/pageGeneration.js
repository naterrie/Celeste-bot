const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const DB = require("../mongoose.js");
const axios = require("axios");
const config = require("../config.js");
const { embedRanked, embedAram, embedDraft } = require('../utils/embedModes.js');

module.exports = {

	async pageGeneration (interaction, index, author)
	{
		const User = await DB.findOne({DiscordId: author});
		if (!User)
			return interaction.reply({content : "Vous n'êtes pas connecté", ephemeral : true});

		const match = await axios.get(`https://${User.Region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${User.Puuid}/ids?api_key=${config.token_riot}`);
		const game = await axios.get(`https://${User.Region}.api.riotgames.com/lol/match/v5/matches/${match.data[index]}?api_key=${config.token_riot}`);

		let embed;
		if (game.data.info.queueId === 420)
			embed = embedRanked(game.data, User);
		else if (game.data.info.queueId === 450)
			embed = embedAram(game.data, User);
		else if (game.data.info.queueId === 400 || game.data.info.queueId === 430 || game.data.info.queueId === 440)
			embed = embedDraft(game.data, User);
		else
			return interaction.reply({content : "Mode de jeu non supporté", ephemeral : true});

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
		nbm = new ButtonBuilder()
			.setCustomId(`nbm-${author}`)
			.setLabel("Back")
			.setStyle(ButtonStyle.Secondary)
			.setDisabled(true)
		const row = new ActionRowBuilder()
			.addComponents(previous, next)
		await interaction.edit({content: "", embeds: [embed], components : [row]});
	},
}

