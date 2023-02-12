const { EmbedBuilder } = require('discord.js');

module.exports = {

    name: "kiss",
    description: "kiss someone",
    permissions: "Aucune",
    dm: false,
    options: [
        {
            type: "user",
            name: "membre",
            description: "user to kiss",
            required: true
        }
    ],
    
    async run(bot, interaction, args) {
    

        let user = interaction.options.getUser("membre")
       
        if(interaction.member.user.id == user.id) return interaction.reply({ content : "Tu ne peux pas t'embrasser toi même", ephemeral : true })
        if(user.id == bot.user.id) return interaction.reply({ content : "Désolé.e, tu ne peux pas embrasser des lignes de code :/", ephemeral : true })

            const embed = new EmbedBuilder()
			.setColor(0xCA335c)
			.setImage("https://cdn.discordapp.com/attachments/1000078993854320682/1074268601365831690/kiss.gif")
            .setDescription(`<@${interaction.member.user.id}> à embrassé.e : <@${user.id}>`)

        await interaction.reply({embeds: [embed], ephemeral : false }) 

    }
}