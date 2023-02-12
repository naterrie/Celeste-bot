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
        
        try {

        let user = interaction.options.getUser("membre")
       

        if(interaction.member.user.id == user.id) return interaction.reply({ content : "Tu ne peux pas t'embrasser toi même", ephemeral : true })
        if(user.id == bot.user.id) return interaction.reply({ content : "Tu es un peu seul dans la vie, non ?", ephemeral : false })

        await interaction.reply({ content : `<@${interaction.member.user.id}> à embrassé : <@${user.id}>`, ephemeral : false }) 

        } catch (err) {

            return interaction.reply({ content: "La commande marche pas tkt frr", ephemeral : true })
        }

    }
}