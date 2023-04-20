const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {

    name: "kiss",
    description: "kiss someone",
    permissions: "Aucune",
    dm: false,
    category: "Cringe",
    options: [
        {
			type: "user",
			name: "membre",
			description: "user to kiss",
			required: true
        }
    ],

    async run(bot, interaction, args)
    {
        let user = interaction.options.getUser("membre");
        const folder = fs.readdirSync('./other/kiss/');
        const getRandomTag = folder[~~(folder.length * Math.random())];
        const file = new AttachmentBuilder(`./other/kiss/${getRandomTag}`);

        if(interaction.member.user.id == user.id)
            return interaction.reply({ content : "Tu ne peux pas t'embrasser toi même", ephemeral : true });
        if(user.bot === true)
            return interaction.reply({ content : "Tu ne peux pas embrasser des robots", ephemeral : true });

        const embed = new EmbedBuilder()
		    .setColor(0xCA335c)
            .setImage(`attachment://${getRandomTag}`)
            .setDescription(`${interaction.user} à embrassé.e : <@${user.id}>`);
        await interaction.reply({embeds: [embed], files: [file] });
    }
};
