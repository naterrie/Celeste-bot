const Discord = require("discord.js");
const intents = new Discord.IntentsBitField(3276799);
const bot = new Discord.Client({intents});
const loadCommands = require("./Loaders/loadCommands");
const loadEvents = require("./Loaders/loadEvents");
const config = require("./config");
const connectDatabase = require("./mongoose");

bot.ownerID = "887337358171713578";
bot.ownerOther = "779435257094864947";
bot.commands = new Discord.Collection();

(async () => {
	try {
	  await connectDatabase();
	  await loadCommands(bot);
	  await loadEvents(bot);
	  await bot.login(config.token_discord);
	} catch (error) {
	  console.error('Une erreur s\'est produite :', error);
	}
  })();

