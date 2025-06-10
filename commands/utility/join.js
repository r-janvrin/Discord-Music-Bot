const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const { getVoiceConnections } = require('@discordjs/voice');
const { createAudioPlayer } = require('@discordjs/voice');
const { createAudioResource } = require('@discordjs/voice');
const { subscribe } = require('@discordjs/voice');
const { generateDependencyReport } = require('@discordjs/voice');
const { VoiceConnectionStatus } = require('@discordjs/voice');

const { guildId, clientId } = require('../../config.json');
 

module.exports = {
	data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('joins the channel user is in')
        .addStringOption(option => 
            option.setName('input')
                .setDescription('Play this file')),
	async execute(interaction) {
        
		
        try{
            const newVoice = await interaction.member.voice.fetch({force: true});
            const myGuild = await Client.guilds.get(guildId);
            const myVoice = await  myGuild.voiceStates.fetch({force: true}, clientId);
            console.log(newVoice);
        }
        catch(error){
            console.log('could not get voice!');
        }

        if(newVoice.channelID === myVoice.channelID){
            interaction.reply('I\'m already in that channel!');
        }
        
        // console.log('voice channel: ');
        // console.log(interaction.member.voice.channelId);
        
        if(interaction.member.voice.channelId)
            {
            try {
                const resource = createAudioResource('C:/Users/ryanj/Desktop/CIS1300_projects/kneeSurgery/songs/goondawgs.mp3');

                const connection = joinVoiceChannel({
                    channelId: interaction.member.voice.channelId,
                    guildId: interaction.guildId,
                    adapterCreator: interaction.member.guild.voiceAdapterCreator,
                });
                
                //**************************************** 


                 connection.on(VoiceConnectionStatus.Ready, () => {
                    console.log('The connection has entered the Ready state - ready to play audio!');
                    connection.subscribe(player);
                    player.play(resource);
                });
                //connection.play('./audiofile.mp3');

                
                await interaction.reply({content: `Joined: ${currVoiceChannel.name}.`, ephemeral:true});
                
            }
            catch (error) {
                console.log(error);
                console.log('^^error');
                await interaction.reply({content: `Could not join voice channel.`, ephemeral:true});
            }
        }
        else{
            interaction.reply({content: `Please join a channel!.`, ephemeral:true});
        }
        
        
        //.then(connection =>{const dispatcher = connection.play('./audiofile.mp3');}).catch(err => console.log(err));
       // dispatcher.on("end", end => {voiceChannel.leave();});
        
        //interaction.user is the object of the user who ran command
        //interaction.member is the guildmember object
	},
};


