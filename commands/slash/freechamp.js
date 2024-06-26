const { EmbedBuilder } = require('discord.js');
const axios = require("axios");
const config = require("../../config.js");
const champname = require("../../champ.js");
const { errBot } = require("../../utils/error.js");

module.exports = {

	name: "freechamp",
	description: "Show free champ of the week",
	permissions: "Aucune",
	dm: true,
	category: "Usefull",

	async run(bot, interaction)
	{
		try
		{
			const freechamp = await axios.get(`https://${config.region}.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${config.token_riot}`);
			let champ = String(freechamp.data.freeChampionIds).split(',');
			let champnew = String(freechamp.data.freeChampionIdsForNewPlayers).split(',');

			for (let i = 0; i < champ.length; i++)
				champ[i] = champname[champ[i]];
			for (let i = 0; i < champnew.length; i++)
				champnew[i] = champname[champnew[i]];

			champ = champ.join(', ');
			champnew = champnew.join(', ');

			const embed = new EmbedBuilder()
				.setColor(0xCA335c)
				.setTitle(`Champions gratuits de la semaine`)
				.setDescription(`Voici la liste des champions gratuits de la semaine :`)
				.addFields(
					{ name: "Champions gratuits", value: `${champ}`},
					{ name: "Champions gratuits pour les nouveaux joueurs", value: `${champnew}`},
					)
				.setTimestamp();

			await interaction.reply({embeds: [embed]});
		}
		catch (error)
		{
			await errBot(error, bot, interaction);
		}
	}
}
