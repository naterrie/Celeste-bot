const Discord = require("discord.js");

module.exports = async (bot, message) => {
	let content = message.content;
	const prefix = ";";

	if (message.author.bot)
		return;

	if (content.startsWith(prefix)) {
	  content = content.slice(prefix.length).trim();
	  let commandFile = (`../commands/message/${content}.js`);

	  try {
		console.log(commandFile);
		let command = require(commandFile);
		await command.run(bot, message);
	  } catch (error) {
		console.error(error);
		message.reply(`Commande non trouvée ou erreur lors de l\'exécution : ${commandFile}`);
	  }
	}
  };
