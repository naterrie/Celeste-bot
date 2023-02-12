const Discord = require("discord.js")

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

        await interaction.reply({ content : `<@${interaction.member.user.id}> à embrassé.e : <@${user.id}>`, ephemeral : false }) 

    }
}