const { EmbedBuilder } = require('discord.js');
const { ActivityType } = require('discord.js');

module.exports = {

	name: "status",
	description: "Change the status of the bot",
	permissions: "Aucune",
	dm: true,
	category: "Usefull",
	options: [
		{
			type: "string",
			name: "status",
			description: "status to set",
			required: true
		}, {
			type: "string",
			name: "type",
			description: "Type of status",
			required: true
		}, {
			type: "string",
			name: "disponibility",
			description: "Set the disponibility",
			required: true
		}
	],

	async run(bot, interaction)
	{
		if (!(interaction.user.id === bot.ownerID  || interaction.user.id === bot.ownerOther))
			return interaction.reply({ content: "Only the owner of the bot can do this", ephemeral: true });

		let status = interaction.options.get("status").value;
		let TypeStatus = interaction.options.get("type").value;
		let TypeDisponibility = interaction.options.get("disponibility").value;

		if (TypeDisponibility !== "idle" && TypeDisponibility !== "online" && TypeDisponibility !== "dnd" && TypeDisponibility !== "invisible")
			return interaction.reply({ content: "Disponibility : idle, online or dnd", ephemeral : true,});

		if (TypeStatus !== "Watching" && TypeStatus !== "Playing" && TypeStatus !== "Streaming" && TypeStatus !== "Listening" && TypeStatus !== "Competiting")
			return interaction.reply({ content: "Type : Watching, Playing, Streaming, Listening or Competiting", ephemeral: true });

		bot.user.setPresence(
		{
			activities: [{ name: status, type: ActivityType[TypeStatus]}],
			status: TypeDisponibility });

			const embed = new EmbedBuilder()
				.setColor(0xCA335c)
				.setTitle(`My status is set !`)
				.setThumbnail(bot.user.displayAvatarURL())
				.setTimestamp()
				.addFields
				(
					{ name: 'status', value: `${status}`, inline: true },
					{ name: 'type', value: `${TypeStatus}`, inline: true },
					{ name: 'Disponibility', value: `${TypeDisponibility}`, inline: true },
				)
		await interaction.reply({embeds: [embed], ephemeral: true});
	}
};
