const axios = require("axios");
const config = require("../../config.js");
const { EmbedBuilder } = require('discord.js');
const champname = require("../../champ.js");
const DB = require("../../mongoose.js");

module.exports = {
	name: "ingame",
	description: "Information about your game in progress",
	permissions: "Aucune",
	dm: true,
	category: "usefull",

	async run(bot, interaction)
	{
		try
		{
			const User = await DB.findOne({DiscordId: interaction.user.id});
			if (!User)
			return await interaction.reply({content : "Vous n'êtes pas connecté", ephemeral : true});

			const player = await axios.get(`https://${config.region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${User.Puuid}?api_key=${config.token_riot}`);
			let match = await axios.get(`https://${config.region}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${player.data.id}?api_key=${config.token_riot}`);

			match.data.gameMode = match.data.gameMode.charAt(0).toUpperCase() + match.data.gameMode.slice(1).toLowerCase();

			const temp = match.data.participants.findIndex(participant => participant.summonerName === User.Name);
			const idchamp = match.data.participants[temp]?.championId;
			const avatarUrl = `https://ddragon.leagueoflegends.com/cdn/${config.version}/img/profileicon/${player.data.profileIconId}.png`;
			match.data.participants.forEach(participant => participant.championId = champname[participant.championId]);
			match.data.gameLength = Math.max(0, match.data.gameLength);

			const embed = new EmbedBuilder()
				.setColor(0xCA335c)
				.setTitle(`Information sur la partie`)
				.addFields(
					{ name: "Mode de jeu", value : `${match.data.gameMode}`},
					{ name: "Durée de la partie", value : `${Math.floor(match.data.gameLength / 60)} minutes`},
					{ name: `${match.data.participants[0].summonerName} vs ${match.data.participants[5].summonerName}`, value: `${champname[match.data.participants[0].championId]} vs ${champname[match.data.participants[5].championId]}`},
					{ name: `${match.data.participants[1].summonerName} vs ${match.data.participants[6].summonerName}`, value: `${champname[match.data.participants[1].championId]} vs ${champname[match.data.participants[6].championId]}`},
					{ name: `${match.data.participants[2].summonerName} vs ${match.data.participants[7].summonerName}`, value: `${champname[match.data.participants[2].championId]} vs ${champname[match.data.participants[7].championId]}`},
					{ name: `${match.data.participants[3].summonerName} vs ${match.data.participants[8].summonerName}`, value: `${champname[match.data.participants[3].championId]} vs ${champname[match.data.participants[8].championId]}`},
					{ name: `${match.data.participants[4].summonerName} vs ${match.data.participants[9].summonerName}`, value: `${champname[match.data.participants[4].championId]} vs ${champname[match.data.participants[9].championId]}`},
				)
				.setThumbnail(avatarUrl)
				.setTimestamp()
			await interaction.reply({embeds: [embed]});
		}catch (error)
		{
			await interaction.reply({content : "Erreur, Joueur non trouvé, ou aucune partie en cours", ephemeral : true});
		}
	}
}
