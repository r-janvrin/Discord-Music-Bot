const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');//fs is native file system
const path = require('node:path');//path is the path to the file

module.exports = {
	data: new SlashCommandBuilder()
		.setName('songoptions')
		.setDescription('Lists all possible song choices.'),
	async execute(interaction) {
		await interaction.reply('Adding everything to queue!');

	},
};
