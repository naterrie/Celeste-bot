const Discord = require("discord.js")

module.exports = async (bot, message) => {

    let prefix = "";

    let messageArray = message.content.split(" ")
    let commandName = messageArray[0].slice(prefix.length)
    let args = messageArray.slice(1)

    if(message.content === "feur" || message.content === "Feur" || message.content === "FEUR")
    {
        await message.reply('ouge')
    }
    // try {
    // let command = require(`../Commandes/${commandName}`)
    //     command.run(bot, message, args)
    // } catch (err) {
        // }
}
