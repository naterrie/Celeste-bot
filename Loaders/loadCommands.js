const fs = require('fs');

module.exports = async bot => {
	fs.readdirSync("./commands/slash").filter(f => f.endsWith(".js")).forEach(async file => {

		let command = require(`../commands/slash/${file}`);
		if (!command.name || typeof command.name !== "string") throw new TypeError(`La commande ${file.slice(0, file.length - 3)} n'a pas de nom !`);
			bot.commands.set(command.name, command);
	});
};
