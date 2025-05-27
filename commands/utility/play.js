const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Plays a song!')
        .addStringOption(option =>
            option.setName('command')
				.setDescription('The command to reload.')
				.setRequired(true)),
        
	async execute(interaction) {
        const commandName = interaction.options.getString('command', true).toLowerCase();
		await interaction.reply('Pong!');
        //interaction.user is the object of the user who ran command
        //interaction.member is the guildmember object
	},
};
