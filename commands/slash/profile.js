const axios = require("axios");
const config = require("../../config.js");
const { EmbedBuilder } = require('discord.js');
const champname = require("../../champ.js");
const mongoose = require('mongoose');
const DB = require("../../mongoose.js");

module.exports = {

	name: "profile",
	description: "Get your profile",
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
			const topchamp = await axios.get(`https:${config.region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${User.Puuid}/top?api_key=${config.token_riot}`)
			const avatarUrl = `https://ddragon.leagueoflegends.com/cdn/11.1.1/img/profileicon/${player.data.profileIconId}.png`;
			let champ = topchamp.data;
			champ[0].championId = champname[topchamp.data[0].championId];
			const embed = new EmbedBuilder()
				.setColor(0xCA335c)
				.setTitle(`Information sur le joueur`)
				.addFields(
					{ name: "Username", value : `${User.Name}#${User.Tag}`, inline: true },
					{ name: "Niveau", value : `${player.data.summonerLevel}`, inline: true},
					{ name: "Champion le plus joué", value : `${champ[0].championId} : Maîtrise ${champ[0].championLevel} avec ${champ[0].championPoints} points`},
				)
				.setThumbnail(avatarUrl)
				.setTimestamp()
			await interaction.reply({embeds: [embed]});
		} catch (error) {
			await interaction.reply({content : "Erreur de données", ephemeral : true});
		}
	}
};
