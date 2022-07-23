require('dotenv').config();
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');

// Creating Discord client with the required intents
const client = new Client({ intents: GatewayIntentBits.Guilds });

// Creating command collection
client.commands = new Collection();

// Creating command array
client.commandArray = [];

// Finding required functions
const functionsFolders = fs.readdirSync('./src/functions');
for (const folder of functionsFolders) {
    const handlerFiles = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter((file) => file.endsWith(".js"));
    for (const file of handlerFiles) require(`./functions/${folder}/${file}`)(client);
}

// Executing required functions
client.eventHandler();
client.commandHandler();

// Logging in as the bot
client.login(process.env.TOKEN);