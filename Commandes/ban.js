const Discord = require("discord.js")

module.exports = {

    name: "ban",
    description: "ban a user",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    options: [
        {
            type: "user",
            name: "membre",
            description: "user to ban",
            required: true
        }, {
            type: "string",
            name: "raison",
            description: "raison du ban",
            required: false
        }
    ],

    async run(bot, message, args) {

    }
}