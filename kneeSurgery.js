const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kneeSurgery')
		.setDescription('That feeling when knee surgery is tomorrow'),
	async execute(interaction) {
		await interaction.reply('Pong!');

		
		/*
		interaction.channel.send({
			files: [{
			  attachment: 'C:\Users\ryanj\Desktop\CIS1300_projects\images/kneeSurgery.jpg',
			  name: 'kneeSurgery.jpg',
			  description: 'That feeling when knee surgery is tomorrow'
			}]
		  })
			.then(console.log)
			.catch(console.error);
		*/
			
	},
};
