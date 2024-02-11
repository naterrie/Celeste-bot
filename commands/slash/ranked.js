const axios = require("axios");
const config = require("../../config.js");
const { EmbedBuilder } = require('discord.js');
const mongoose = require('mongoose');
const DB = require("../../mongoose.js");

module.exports = {

	name: "ranked",
	description: "Show ranked stats of a player",
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
			const ranked = await axios.get(`https://${config.region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${player.data.id}?api_key=${config.token_riot}`);
			const avatarUrl = `https://ddragon.leagueoflegends.com/cdn/11.1.1/img/profileicon/${player.data.profileIconId}.png`
			const tier = ranked.data[0].tier.charAt(0).toUpperCase() + ranked.data[0].tier.slice(1).toLowerCase();
			const embed = new EmbedBuilder()
				.setColor(0xCA335c)
				.setTitle(`${User.Name}#${User.Tag} rankeds stats`)
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
