const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

module.exports = (client) => {
    client.commandHandler = async () => {
        const commandFolders = fs.readdirSync('./src/commands');
        // Loop through command folders
        for (const folder of commandFolders) {
            const commandFiles = fs
                .readdirSync(`./src/commands/${folder}`)
                .filter((file) => file.endsWith('.js'));

            const { commands, commandArray } = client;

            // Loop through command files
            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);

                // Add the command to the command collection and array

                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
                console.log(`COMMAND: Found '${command.data.name}'`)
            }
        }

        // Bot ID
        const clientID = '';
        // Server ID
        const guildID = '';

        const rest = new REST({ version: 9 }).setToken(process.env.token);

        try {
            console.log('SLASH: Started refreshing application commands');

            await rest.put(

                /*

                Currently, your slash commands are only available on the server you entered as 'guildID'.
                If you want your bots slash commands to function on multiple servers, change the code 
                below this comment to the following bit:

                Routes.applicationCommands(clientId),
                {
                    body: client.commandArray
                },

                WARNING: If you do end up using the code bit above, refreshing your slash commands could
                take multiple hours to finish! However, once they are finished refreshing, your
                bots slash commands will work on any server its properly invited on.

                */

                Routes.applicationGuildCommands(clientID, guildID),
                {
                    body: client.commandArray
                }
            );

            console.log('SLASH: Successfully refreshed application commands');
        } catch (error) {
            console.log("WARNING: Your set Client / Guild ID seems to be invalid.");
        }

    };

}