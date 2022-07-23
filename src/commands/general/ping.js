const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        // The name of your Command
        .setName('ping')
        // The description of your Command
        .setDescription('The classic Ping command!'),

    // The code executed once the command is called
    async execute(interaction, client) {
        await interaction.reply('Pong!');
    }
}