const axios = require("axios");
const config = require("../../config.js");
const champname = require("../../champ.js");
const DB = require("../../mongoose.js");
const { errBot } = require("../../utils/error.js");
const Canvas = require("canvas");
const { AttachmentBuilder } = require('discord.js');

module.exports = {

	name: "profile",
	description: "Get your profile",
	permissions: "Aucune",
	dm: true,
	category: "usefull",

	async run(bot, interaction)
	{
		const User = await DB.findOne({ DiscordId: interaction.user.id });
		if (!User)
			return await interaction.reply({ content: "Vous n'êtes pas connecté", ephemeral: true });

		let player;
		let topchamp;
		try
		{
			player = await axios.get(`https://${config.region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${User.Puuid}?api_key=${config.token_riot}`);
			topchamp = await axios.get(`https:${config.region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${User.Puuid}/top?api_key=${config.token_riot}`);
		}
		catch (error)
		{
			return errBot(error.response?.status, bot, interaction);
		}

		const avatarUrl = `https://ddragon.leagueoflegends.com/cdn/${config.version}/img/profileicon/${player.data.profileIconId}.png`;
		let champ = topchamp.data;
		champ[0].championId = champname[topchamp.data[0].championId];

		const champImageUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ[0].championId}_0.jpg`;

		const canvas = Canvas.createCanvas(915, 540);
		const ctx = canvas.getContext('2d');

		ctx.fillStyle = "#1e1e1e";
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		const avatar = await Canvas.loadImage(avatarUrl);
		const avatarSize = 128;
		ctx.drawImage(avatar, 50, 50, avatarSize, avatarSize);

		const champImage = await Canvas.loadImage(champImageUrl);
		const champImageSize = 200;
		ctx.drawImage(champImage, 600, 50, champImageSize, champImageSize);

		ctx.font = 'bold 30px Arial';
		ctx.fillStyle = "#FFFFFF";
		ctx.fillText(`Profil de ${User.Name}#${User.Tag}`, 50, 220);

		ctx.font = 'bold 24px Arial';
		ctx.fillText(`Niveau : ${player.data.summonerLevel}`, 50, 260);

		ctx.font = 'bold 24px Arial';
		ctx.fillText(`${champ[0].championId}`, 50, 300);
		ctx.fillText(`Maîtrise ${champ[0].championLevel} avec ${champ[0].championPoints} points`, 50, 340);

		const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'profile.png' });
		await interaction.reply({ files: [attachment] });
	}
};
