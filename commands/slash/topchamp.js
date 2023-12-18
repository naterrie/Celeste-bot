const Discord = require("discord.js");
const axios = require("axios");
const config = require("../../config.js");
const { EmbedBuilder } = require('discord.js');
const champname = require("../../champ.js");

module.exports = {

	name: "topchamp",
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
			const level = await axios.get(`https://${config.region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${PUUID.data.puuid}?api_key=${config.token_riot}`);
			const temp = await axios.get(`https:${config.region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${PUUID.data.puuid}/top?api_key=${config.token_riot}`)
			let champ = temp.data;
			for (let i = 0; i < 3; i++)
				champ[i].championId = champname[temp.data[i].championId];
			const url = `https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${champ[0].championId}.png`;
			const embed = new EmbedBuilder()
				.setColor(0xCA335c)
				.setTitle(`${PUUID.data.gameName}#${PUUID.data.tagLine} top champ`)
				.addFields(
					{ name: "Première place", value : `${champ[0].championId} : Maîtrise ${champ[0].championLevel} avec ${champ[0].championPoints} points`},
					{ name: "Deuxième place", value : `${champ[1].championId} : Maîtrise ${champ[1].championLevel} avec ${champ[1].championPoints} points`},
					{ name: "Troisième place", value : `${champ[2].championId} : Maîtrise ${champ[2].championLevel} avec ${champ[2].championPoints} points`},
				)
				.setThumbnail(url)
				.setTimestamp()
			await interaction.reply({embeds: [embed]});
		} catch (error) {
			await interaction.reply({content : "Erreur, Joueur non trouvé", ephemeral : true});
		}
	}
};
