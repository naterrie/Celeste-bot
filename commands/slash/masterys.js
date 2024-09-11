const axios = require("axios");
const config = require("../../config.js");
const { AttachmentBuilder } = require('discord.js');
const champname = require("../../champ.js");
const DB = require("../../mongoose.js");
const { errBot } = require("../../utils/error.js");
const Canvas = require("canvas");

module.exports = {

	name: "masterys",
	description: "Get the top 3 champions of mastery",
	permissions: "Aucune",
	dm: true,
	category: "usefull",

	async run(bot, interaction)
	{
		const User = await DB.findOne({ DiscordId: interaction.user.id });
		if (!User)
			return await interaction.reply({ content: "Vous n'êtes pas connecté", ephemeral: true });

		let temp;
		try
		{
			temp = await axios.get(`https:${config.region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${User.Puuid}/top?api_key=${config.token_riot}`);
		}
		catch (error)
		{
			return errBot(error.response?.status, bot, interaction);
		}

		let champ = temp.data;
		for (let i = 0; i < 3; i++)
			champ[i].championId = champname[temp.data[i].championId];

		const canvas = Canvas.createCanvas(915, 540);
		const ctx = canvas.getContext("2d");

		const background = await Canvas.loadImage(`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ[0].championId}_0.jpg`);
		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

		const drawChampionCircle = async (champ, x, y, radius) => {
			const url = `https://ddragon.leagueoflegends.com/cdn/${config.version}/img/champion/${champ.championId}.png`;

			ctx.beginPath();
			ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
			ctx.closePath();
			ctx.clip();

			const avatar = await Canvas.loadImage(url);
			const diameter = radius * 2;
			const avatarSize = Math.min(avatar.width, avatar.height);
			const scale = diameter / avatarSize;

			const xOffset = x - (avatar.width * scale) / 2;
			const yOffset = y - (avatar.height * scale) / 2;
			ctx.drawImage(avatar, xOffset, yOffset, avatar.width * scale, avatar.height * scale);

			ctx.restore();

			ctx.font = 'bold 20px Arial';
			ctx.fillStyle = "#FFFFFF";
			ctx.textAlign = "center";
			ctx.fillText(`Level: ${champ.championLevel}`, x, y + radius + 25);
			ctx.fillText(`${champ.championPoints} pts`, x, y + radius + 45);
		};

		const centralCircleX = canvas.width / 2;
		const centralCircleY = canvas.height / 2;
		const circleRadius = 92;

		const leftCircleX = centralCircleX - 250;
		const rightCircleX = centralCircleX + 250;

		ctx.save();
		await drawChampionCircle(champ[0], centralCircleX, centralCircleY - 50, circleRadius);
		ctx.save();
		await drawChampionCircle(champ[1], leftCircleX, centralCircleY, circleRadius);
		ctx.save();
		await drawChampionCircle(champ[2], rightCircleX, centralCircleY, circleRadius);

		const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: `topchamp.png` });
		return interaction.reply({ content: null, files: [attachment] });
	}
};
