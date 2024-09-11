const axios = require("axios");
const config = require("../../config.js");
const DB = require("../../mongoose.js");
const { errBot } = require("../../utils/error.js");
const Canvas = require("canvas");
const { AttachmentBuilder } = require('discord.js');
const path = require("path");

module.exports = {

	name: "ranked",
	description: "Show ranked stats of a player",
	permissions: "Aucune",
	dm: true,
	category: "usefull",

	async run(bot, interaction)
	{
		const User = await DB.findOne({ DiscordId: interaction.user.id });
		if (!User)
			return await interaction.reply({ content: "Vous n'êtes pas connecté", ephemeral: true });

		let player;
		let ranked;
		try
		{
			player = await axios.get(`https://${config.region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${User.Puuid}?api_key=${config.token_riot}`);
			ranked = await axios.get(`https://${config.region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${player.data.id}?api_key=${config.token_riot}`);

			if (!ranked.data || ranked.data.length === 0) {
				return interaction.reply({ content: "Aucune donnée classée trouvée pour ce joueur.", ephemeral: true });
			}
		}
		catch (error)
		{
			return errBot(error.response?.status, bot, interaction);
		}

		const avatarUrl = `https://ddragon.leagueoflegends.com/cdn/${config.version}/img/profileicon/${player.data.profileIconId}.png`;

		const tier = ranked.data[0].tier.charAt(0).toUpperCase() + ranked.data[0].tier.slice(1).toLowerCase();
		const rank = tier;

		const rankImagePath = path.join(__dirname, `../../ranks/${rank}.png`);

		const canvas = Canvas.createCanvas(915, 540);
		const ctx = canvas.getContext('2d');

		ctx.fillStyle = "#282828";
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		const avatar = await Canvas.loadImage(avatarUrl);
		const avatarSize = 128;
		ctx.drawImage(avatar, 50, 50, avatarSize, avatarSize);

		ctx.font = 'bold 28px Arial';
		ctx.fillStyle = "#FFFFFF";
		ctx.fillText(`${User.Name}#${User.Tag} - Ranked Stats`, 200, 80);

		ctx.font = '24px Arial';
		ctx.fillText(`Tier: ${tier} ${ranked.data[0].rank} - ${ranked.data[0].leaguePoints} LP`, 200, 130);
		ctx.fillText(`Wins: ${ranked.data[0].wins}`, 200, 170);
		ctx.fillText(`Losses: ${ranked.data[0].losses}`, 200, 210);

		const winrate = Math.round((ranked.data[0].wins / (ranked.data[0].wins + ranked.data[0].losses)) * 100);
		ctx.fillText(`Winrate: ${winrate}%`, 200, 250);

		try {
			const rankBadge = await Canvas.loadImage(rankImagePath);
			ctx.drawImage(rankBadge, 600, 50, 128, 128);
		} catch (error) {
			console.error(`Erreur lors du chargement de l'image du rang : ${rankImagePath}`, error);
		}

		const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'ranked-stats.png' });
		await interaction.reply({ files: [attachment] });
	}
};
