const Discord = require("discord.js");

module.exports = async (bot, message) => {
    try
    {
        let command = require(`../message/${message.content}`);
        command.run(bot, message);
    }
    catch (err)
    {
        return;
    }
}
