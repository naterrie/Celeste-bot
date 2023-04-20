const Discord = require("discord.js");

module.exports = async (bot, interaction) => {

    if(interaction.type === Discord.InteractionType.ApplicationCommand)
    {
        let command = require(`../Commandes/${interaction.commandName}`);
        command.run(bot, interaction, command.options);
        if(interaction.type === "setstatus")
        {
            let choices = ["Listening", "Watching", "Streaming", "Playing", "Competiting"];
            let sortie = choices.filter(c => c.includes(entry));
            await interaction.respond(entry === "" ? sortie.map(c => ({name: c, value: c})) : sortie.map(c => ({name: c, value: c})));
        }
    else
        return;
    }
};
