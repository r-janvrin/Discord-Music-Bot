const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('blackpanther')
		.setDescription('Summon the panther dressed in black.'),

	async execute(interaction) {
		await interaction.reply({ content: 'RIZZ', ephemeral:true}) 
		var channel = interaction.channel;
		
		channel.send({
			files: [{
				attachment: 'C:/Users/ryanj/Desktop/CIS1300_projects/images/rizzler.jpg',
    			name: 'rizz.jpg',
			}]
		})
		interaction.deleteReply();
		


        //interaction.user is the object of the user who ran command
        //interaction.member is the guildmember object
	},
};
