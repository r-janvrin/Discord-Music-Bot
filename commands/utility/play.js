const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Plays a song!')
        .addStringOption(option =>
            option.setName('songname')
				.setDescription('The name of the song to play')
				.setRequired(true)),
        
	async execute(interaction) {
        const songName = interaction.options.getString('songname', true);
		await interaction.reply('Adding ' + songName + ' to the queue!');
        //interaction.user is the object of the user who ran command
        //interaction.member is the guildmember object
	},
};
