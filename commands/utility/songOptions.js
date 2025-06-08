const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');//fs is native file system
const path = require('node:path');//path is the path to the file

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reload')
		.setDescription('Lists all possible song choices.'),
	async execute(interaction) {
		//enter the song folder
		let totalnames = '';
		const foldersPath = path.join(__dirname, 'songs');
		const songFolders = fs.readdirSync(foldersPath);//read everything from the folders into commandFolders (array)

		//adding the commands
		for (const folder of songFolders) {
			const commandsPath = path.join(foldersPath, folder);
			const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.mp3'));
			for (const file of commandFiles) {
				const filePath = path.join(commandsPath, file);
				const command = require(filePath);
				totalnames = totalnames + file + ' ';
			}
		}
		await interaction.reply('Options: ' + totalnames);

	},
};
