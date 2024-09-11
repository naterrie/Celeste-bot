const config = require("../config.js");

module.exports = {
	async errBot(err, bot, interaction)
	{
		try
		{
			if (interaction.commandName === "ingame")
			{
				return await interaction.reply({content : "Not in game or error", ephemeral : true});
			}
			const channel = bot.channels.cache.get(config.err_channel);
			switch (err)
			{
				case (400):
					channel.send("Error 400, Bad request <@887337358171713578>");
					break;
				case (401):
					channel.send("Error 401,Unauthorized <@887337358171713578>");
					break;
				case (403):
					channel.send("Error 403, Api key invalid <@887337358171713578>");
					break;
				case (404):
					channel.send("Error 404, Data not found <@887337358171713578>");
					break;
				case (415):
					channel.send("Error 415, Unsupported Media Type <@887337358171713578>");
					break;
				case (429):
					channel.send("Error 429, Rate limit exceeded <@887337358171713578>");
					break;
				case (500):
					channel.send("Error 500, Internal server error <@887337358171713578>");
					break;
				case (502):
					channel.send("Error 502, Bad Gateway <@887337358171713578>");
					break;
				case (503):
					channel.send("Error 503, Service unavailable <@887337358171713578>");
					break;
				case (504):
					channel.send("Error 504, Gateway timeout <@887337358171713578>");
					break;
			}
			return await interaction.reply({content : "Error, working on it", ephemeral : true});
		}
		catch (error)
		{
			await interaction.reply({content : "Error, bot down", ephemeral : true});
			console.log(error);
			process.exit(1);
		}
	}
}
