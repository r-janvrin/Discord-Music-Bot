const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Plays a song!')
        .addStringOption(option =>
            option.setName('songName')
				.setDescription('The name of the song to play')
				.setRequired(true)),
        
	async execute(interaction) {
        const songName = interaction.options.getString('songName', true).toLowerCase();
		await interaction.reply('Adding ' + songName + ' to the queue!');
        //interaction.user is the object of the user who ran command
        //interaction.member is the guildmember object
	},
};
