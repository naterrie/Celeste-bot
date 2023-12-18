const { EmbedBuilder } = require('discord.js');
const Discord = require("discord.js");
const axios = require("axios");
const config = require("../../config.js");
const champname = require("../../champ.js");

module.exports = {

	name: "freechamp",
	description: "Wich champ is free this week ?",
	permissions: "Aucune",
	dm: true,
	category: "Usefull",

	async run(bot, interaction)
	{
		const freechamp = await axios.get(`https://${config.region}.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${config.token_riot}`);
		let champ = String(freechamp.data.freeChampionIds).split(',');
		let champ2 = String(freechamp.data.freeChampionIdsForNewPlayers).split(',');
		for (let i = 0; i < champ.length; i++)
			champ[i] = champname[champ[i]];
		for (let i = 0; i < champ2.length; i++)
			champ2[i] = champname[champ2[i]];
		champ = champ.join(', ');
		champ2 = champ2.join(', ');
		const embed = new EmbedBuilder()
			.setColor(0xCA335c)
			.setTitle(`Champions gratuits de la semaine`)
			.setDescription(`Voici la liste des champions gratuits de la semaine :`)
			.addFields(
				{ name: "Champions gratuits", value: `${champ}`},
				{ name: "Champions gratuits pour les nouveaux joueurs", value: `${champ2}`},
				)
			.setTimestamp();
		await interaction.reply({embeds: [embed]});
	}
}
