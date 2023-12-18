const Discord = require("discord.js");
const axios = require("axios");
const config = require("../../config.js");
const { EmbedBuilder } = require('discord.js');
const champname = require("../../champ.js");

module.exports = {

	name: "playerinfo",
	description: "Send a message with the bot",
	permissions: "Aucune",
	dm: true,
	category: "usefull",
	options: [
		{
			type: "string",
			name: "summoner",
			description: "get stats of a summoner",
			required: true
		}, {
			type: "string",
			name: "tag",
			description: "the tag of the summoner",
			required: true
		}, {
			type: "string",
			name: "region",
			description: "the region of the summoner",
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
			const avatarUrl = `https://ddragon.leagueoflegends.com/cdn/11.1.1/img/profileicon/${player.data.profileIconId}.png`;
			const topchamp = await axios.get(`https:${config.region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${PUUID.data.puuid}/top?api_key=${config.token_riot}`)
			let champ = topchamp.data;
			champ[0].championId = champname[topchamp.data[0].championId];
			const embed = new EmbedBuilder()
				.setColor(0xCA335c)
				.setTitle(`Information sur le joueur`)
				.addFields(
					{ name: "Username", value : `${PUUID.data.gameName}#${PUUID.data.tagLine}`, inline: true },
					{ name: "Niveau", value : `${player.data.summonerLevel}`, inline: true},
					{ name: "Champion le plus joué", value : `${champ[0].championId} : Maîtrise ${champ[0].championLevel} avec ${champ[0].championPoints} points`},
				)
				.setThumbnail(avatarUrl)
				.setTimestamp()
			await interaction.reply({embeds: [embed]});
		} catch (error) {
			await interaction.reply({content : "Erreur, Joueur non trouvé", ephemeral : true});
		}
	}
};
