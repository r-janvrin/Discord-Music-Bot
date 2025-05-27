const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shush')
		.setDescription('Shut up.'),

	async execute(interaction) {
		await interaction.reply({ content: 'quiet', ephemeral:true}) 
		var channel = interaction.channel;
		
		channel.send({
			files: [{
				attachment: 'C:/Users/ryanj/Desktop/CIS1300_projects/images/hard-image.png',
    			name: 'shush.png',
			}]
		})
		interaction.deleteReply();
		


        //interaction.user is the object of the user who ran command
        //interaction.member is the guildmember object
	},
};
