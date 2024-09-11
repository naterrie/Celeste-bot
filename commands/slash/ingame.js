const axios = require("axios");
const config = require("../../config.js");
const { EmbedBuilder } = require('discord.js');
const champname = require("../../champ.js");
const DB = require("../../mongoose.js");
const { errBot } = require("../../utils/error.js");

module.exports = {
	name: "ingame",
	description: "Information about your game in progress",
	permissions: "Aucune",
	dm: true,
	category: "usefull",

	async run(bot, interaction)
	{
		const User = await DB.findOne({DiscordId: interaction.user.id});
		if (!User)
			return await interaction.reply({content : "Vous n'êtes pas connecté", ephemeral : true});

		let match;
		let player;
		try
		{
			player = await axios.get(`https://${config.region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${User.Puuid}?api_key=${config.token_riot}`);
			match = await axios.get(`https://${config.region}.api.riotgames.com/lol/spectator/v5/active-games/by-summoner/${User.Puuid}?api_key=${config.token_riot}`);
		}
		catch (error)
		{
			return errBot(error.response?.status, bot, interaction);
		}
		match.data.gameMode = match.data.gameMode.charAt(0).toUpperCase() + match.data.gameMode.slice(1).toLowerCase();

		const avatarUrl = `https://ddragon.leagueoflegends.com/cdn/${config.version}/img/profileicon/${player.data.profileIconId}.png`;
		match.data.participants.forEach(participant => participant.championId = champname[participant.championId]);
		match.data.gameLength = Math.max(0, match.data.gameLength);

		let participant = [];
		for (let i = 0; i < 10; i++)
			participant = match.data.participants[i];

		let champions = [];
		for (let i = 0; i < 10; i++)
			champions = champname[match.data.participants[i].championId];

		const embed = new EmbedBuilder()
			.setColor(0xCA335c)
			.setTitle(`Information sur la partie`)
			.addFields(
				{ name: "Mode de jeu", value : `${match.data.gameMode}`},
				{ name: "Durée de la partie", value : `${Math.floor(match.data.gameLength / 60)} minutes`},
				{ name: `${participant[0]} vs ${participant[5]}`, value: `${champions[0]} vs ${champions[5]}`},
				{ name: `${participant[1]} vs ${participant[6]}`, value: `${champions[1]} vs ${champions[6]}`},
				{ name: `${participant[2]} vs ${participant[7]}`, value: `${champions[2]} vs ${champions[7]}`},
				{ name: `${participant[3]} vs ${participant[8]}`, value: `${champions[3]} vs ${champions[8]}`},
				{ name: `${participant[4]} vs ${participant[9]}`, value: `${champions[4]} vs ${champions[9]}`},
			)
			.setThumbnail(avatarUrl)
			.setTimestamp()
		await interaction.reply({embeds: [embed]});
	}
}
