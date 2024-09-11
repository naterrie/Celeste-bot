const { EmbedBuilder } = require("discord.js");
const config = require("../config.js");
const champname = require("../champ.js");

module.exports = {
	async embedAram(game, User)
	{
		game.data.info.gameMode = "Aram";

		const temp = game.data.info.participants.findIndex(participant => participant.riotIdGameName === User.Name);

		const url = `https://ddragon.leagueoflegends.com/cdn/${config.version}/img/champion/${champname[game.data.info.participants[temp].championId]}.png`;

		const color = game.data.info.participants[temp].win ? 0x00FF00 : 0xFF0000;
		const gameModeText = `${game.data.info.participants[temp].win ? 'Victory' : 'Defeat'} in Aram;`;

		let kda = [], champions = [], player = [];
		for (let i = 0; i < 10; i++)
		{
			kda[i] = `${game.data.info.participants[i].kills}/${game.data.info.participants[i].deaths}/${game.data.info.participants[i].assists}`;
			champions[i] = champname[game.data.info.participants[i].championId];
			player[i] = game.data.info.participants[i].riotIdGameName;
		}

		const embed = new EmbedBuilder()
			.setColor(color)
			.setTitle(`Information sur la partie`)
			.addFields(
				{ name: "Mode de jeu", value: gameModeText, inline: true },
				{ name: "Durée de la partie", value: `${Math.floor(game.data.info.gameDuration / 60)}m${Math.ceil(game.data.info.gameDuration % 60)}s`, inline: true },
				{ name: `${player[0]} vs ${player[5]}`, value: `${champions[0]} ${kda[0]} vs ${champions[5]} ${kda[5]}` },
				{ name: `${player[1]} vs ${player[6]}`, value: `${champions[1]} ${kda[1]} vs ${champions[6]} ${kda[6]}` },
				{ name: `${player[2]} vs ${player[7]}`, value: `${champions[2]} ${kda[2]} vs ${champions[7]} ${kda[7]}` },
				{ name: `${player[3]} vs ${player[8]}`, value: `${champions[3]} ${kda[3]} vs ${champions[8]} ${kda[8]}` },
				{ name: `${player[4]} vs ${player[9]}`, value: `${champions[4]} ${kda[4]} vs ${champions[9]} ${kda[9]}` }
			)
			.setThumbnail(url)
			.setTimestamp();

		return embed;
	}
};

module.exports = {
	async embedRanked(game, User)
	{
		game.data.info.gameMode = "Ranked Solo/Duo";

		const temp = game.data.info.participants.findIndex(participant => participant.riotIdGameName === User.Name);

		const url = `https://ddragon.leagueoflegends.com/cdn/${config.version}/img/champion/${champname[game.data.info.participants[temp].championId]}.png`;

		const color = game.data.info.participants[temp].win ? 0x00FF00 : 0xFF0000;
		const gameModeText = `${game.data.info.participants[temp].win ? 'Victory' : 'Defeat'} in Ranked Solo/Duo`;

		let kda = [], champions = [], player = [];
		for (let i = 0; i < 10; i++)
		{
			kda[i] = `${game.data.info.participants[i].kills}/${game.data.info.participants[i].deaths}/${game.data.info.participants[i].assists}`;
			champions[i] = champname[game.data.info.participants[i].championId];
			player[i] = game.data.info.participants[i].riotIdGameName;
		}

		const embed = new EmbedBuilder()
			.setColor(color)
			.setTitle(`Information sur la partie`)
			.addFields(
				{ name: "Mode de jeu", value: gameModeText, inline: true },
				{ name: "Durée de la partie", value: `${Math.floor(game.data.info.gameDuration / 60)}m${Math.ceil(game.data.info.gameDuration % 60)}s`, inline: true },
				{ name: `${player[0]} vs ${player[5]}`, value: `${champions[0]} ${kda[0]} vs ${champions[5]} ${kda[5]}` },
				{ name: `${player[1]} vs ${player[6]}`, value: `${champions[1]} ${kda[1]} vs ${champions[6]} ${kda[6]}` },
				{ name: `${player[2]} vs ${player[7]}`, value: `${champions[2]} ${kda[2]} vs ${champions[7]} ${kda[7]}` },
				{ name: `${player[3]} vs ${player[8]}`, value: `${champions[3]} ${kda[3]} vs ${champions[8]} ${kda[8]}` },
				{ name: `${player[4]} vs ${player[9]}`, value: `${champions[4]} ${kda[4]} vs ${champions[9]} ${kda[9]}` }
			)
			.setThumbnail(url)
			.setTimestamp();

		return embed;
	}
};

module.exports = {
	async embedDraft(game, User)
	{
		game.info.gameMode = "Normal game";

		const temp = game.metadata.participants.findIndex(participant => participant.riotIdGameName === User.Name);

		const puuidIndex = game.metadata.participants.findIndex(puuid => puuid === User.puuid);
		const participantData = game.info.participants[puuidIndex];
		const url = `https://ddragon.leagueoflegends.com/cdn/${config.version}/img/champion/${champname[participantData.championId]}.png`;

		const color = game.data.info.participants[temp].win ? 0x00FF00 : 0xFF0000;
		const gameModeText = `${game.data.info.participants[temp].win ? 'Victory' : 'Defeat'} in Normal game`;

		let kda = [], champions = [], player = [];
		for (let i = 0; i < 10; i++)
		{
			kda[i] = `${game.data.info.participants[i].kills}/${game.data.info.participants[i].deaths}/${game.data.info.participants[i].assists}`;
			champions[i] = champname[game.data.info.participants[i].championId];
			player[i] = game.data.info.participants[i].riotIdGameName;
		}

		const embed = new EmbedBuilder()
			.setColor(color)
			.setTitle(`Information sur la partie`)
			.addFields(
				{ name: "Mode de jeu", value: gameModeText, inline: true },
				{ name: "Durée de la partie", value: `${Math.floor(game.data.info.gameDuration / 60)}m${Math.ceil(game.data.info.gameDuration % 60)}s`, inline: true },
				{ name: `${player[0]} vs ${player[5]}`, value: `${champions[0]} ${kda[0]} vs ${champions[5]} ${kda[5]}` },
				{ name: `${player[1]} vs ${player[6]}`, value: `${champions[1]} ${kda[1]} vs ${champions[6]} ${kda[6]}` },
				{ name: `${player[2]} vs ${player[7]}`, value: `${champions[2]} ${kda[2]} vs ${champions[7]} ${kda[7]}` },
				{ name: `${player[3]} vs ${player[8]}`, value: `${champions[3]} ${kda[3]} vs ${champions[8]} ${kda[8]}` },
				{ name: `${player[4]} vs ${player[9]}`, value: `${champions[4]} ${kda[4]} vs ${champions[9]} ${kda[9]}` }
			)
			.setThumbnail(url)
			.setTimestamp();

		return embed;
	}
};
