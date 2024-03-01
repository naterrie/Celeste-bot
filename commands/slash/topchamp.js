const axios = require("axios");
const config = require("../../config.js");
const { EmbedBuilder } = require('discord.js');
const champname = require("../../champ.js");
const DB = require("../../mongoose.js");

module.exports = {

	name: "topchamp",
	description: "Get top 3 champ of a summoner",
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

			const temp = await axios.get(`https:${config.region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${User.Puuid}/top?api_key=${config.token_riot}`)
			let champ = temp.data;
			for (let i = 0; i < 3; i++)
				champ[i].championId = champname[temp.data[i].championId];

			const url = `https://ddragon.leagueoflegends.com/cdn/${config.version}/img/champion/${champ[0].championId}.png`;
			const embed = new EmbedBuilder()
				.setColor(0xCA335c)
				.setTitle(`${User.Name}#${User.Tag} top champ`)
				.addFields(
					{ name: "Première place", value : `${champ[0].championId} : Maîtrise ${champ[0].championLevel} avec ${champ[0].championPoints} points`},
					{ name: "Deuxième place", value : `${champ[1].championId} : Maîtrise ${champ[1].championLevel} avec ${champ[1].championPoints} points`},
					{ name: "Troisième place", value : `${champ[2].championId} : Maîtrise ${champ[2].championLevel} avec ${champ[2].championPoints} points`},
				)
				.setThumbnail(url)
				.setTimestamp()
			await interaction.reply({embeds: [embed]});
		}
		catch (error)
		{
			await interaction.reply({content : "Erreur, Joueur non trouvé", ephemeral : true});
		}
	}
};
