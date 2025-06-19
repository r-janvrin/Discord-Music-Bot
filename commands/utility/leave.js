const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Leaves the current call'),
        
	async execute(interaction) {
        //let currentStatus = getVoiceConnection()
		await interaction.reply('Leaving call!');
        //interaction.user is the object of the user who ran command
        //interaction.member is the guildmember object
	},
};
