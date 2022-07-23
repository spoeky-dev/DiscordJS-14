module.exports = {
    name: 'interactionCreate',

    async execute(interaction, client) {

        if (interaction.isChatInputCommand()) {
            const { commands } = client;
            const { commandName } = interaction;
            // Check if the interaction is a command
            const command = commands.get(commandName);
            if (!command) return;

            try {
                // Try to execute the command
                await command.execute(interaction, client);
            } catch (error) {
                console.log(error);
                await interaction.reply({
                    content: 'There was an internal error while executing this command',
                    ephemeral: true
                });
            }
        }

    },
};