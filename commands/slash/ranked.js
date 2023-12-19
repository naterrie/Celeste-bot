const axios = require("axios");
const config = require("../../config.js");
const { EmbedBuilder } = require('discord.js');

module.exports = {

	name: "ranked",
	description: "Show ranked stats of a player",
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
			const ranked = await axios.get(`https://${config.region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${player.data.id}?api_key=${config.token_riot}`);
			const avatarUrl = `https://ddragon.leagueoflegends.com/cdn/11.1.1/img/profileicon/${player.data.profileIconId}.png`
			const tier = ranked.data[0].tier.charAt(0).toUpperCase() + ranked.data[0].tier.slice(1).toLowerCase();
			const embed = new EmbedBuilder()
				.setColor(0xCA335c)
				.setTitle(`${PUUID.data.gameName}#${PUUID.data.tagLine} rankeds stats`)
				.addFields(
					{ name: `Placement du joueur`, value : `${tier} ${ranked.data[0].rank} ${ranked.data[0].leaguePoints} LP`},
					{ name: `Victoires/Défaites`, value : `${ranked.data[0].wins}/${ranked.data[0].losses}`},
					{ name: `Winrate`, value : `${Math.round((ranked.data[0].wins / (ranked.data[0].wins + ranked.data[0].losses)) * 100)}%`},
				)
				.setThumbnail(avatarUrl)
				.setTimestamp()
			await interaction.reply({embeds: [embed]});
		} catch (error) {
			await interaction.reply({content : "Erreur, Joueur non trouvé", ephemeral : true});
		}
	}
};
