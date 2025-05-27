const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('knee')
		.setDescription('That feeling when knee surgery is tomorrow'),

	async execute(interaction) {
		await interaction.reply({ content: 'That feeling when knee surgery is tomorrow', ephemeral:true}) //{ content: 'on it boss!', flags: MessageFlags.Ephemeral } { content: 'Secret Pong!', flags: MessageFlags.Ephemeral }
		var channel = interaction.channel;
		
		channel.send({
			files: [{
				attachment: 'C:/Users/ryanj/Desktop/CIS1300_projects/images/kneeSurgery.png',
    			name: 'knee.png',
    			description: 'That feeling when knee surgery is tomorrow'
			}]
		})
		interaction.deleteReply();


        //interaction.user is the object of the user who ran command
        //interaction.member is the guildmember object
	},
};
