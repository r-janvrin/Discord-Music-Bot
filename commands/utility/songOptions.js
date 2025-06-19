const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');//fs is native file system
const path = require('node:path');//path is the path to the file

module.exports = {
	data: new SlashCommandBuilder()
		.setName('songoptions')
		.setDescription('Lists all possible song choices.'),
	async execute(interaction) {
		//enter the song folder
		let totalnames = '';
		const foldersPath = path.join(__dirname, '..', '..',  'songs');
		const songFolders = fs.readdirSync(foldersPath).filter(file => file.endsWith('.mp3'));//read everything from the folders into commandFolders (array)

		//adding the commands
		for (const file of songFolders) {
			totalnames = totalnames + file + ' ';
		}
		await interaction.reply('Options: ' + totalnames);

	},
};
