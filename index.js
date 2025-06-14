// class declaration


// Require the necessary discord.js classes
const { token, clientId } = require('./config.json');

const fs = require('node:fs');//fs is native file system
const path = require('node:path');//path is the path to the file
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { createAudioPlayer, createAudioResource, joinVoiceChannel, VoiceConnectionStatus, NoSubscriberBehavior, AudioPlayerStatus } = require('@discordjs/voice');



const client = new Client({ 
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildVoiceStates
	]
 });

client.commands = new Collection();

//enter the command folder
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);//read everything from the folders into commandFolders (array)

//adding the commands
for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}




// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Log in to Discord with your client's token
client.login(token);

//create the linked list
class SongLinkedList{
	constructor(){//run on item creation
		this.head=null;
		this.next=null;
		this.player = createAudioPlayer({
			behaviors: {
				NoSubscriberBehavior: NoSubscriberBehavior.Pause,
			}
		});

		//automatically play next song when empty
		this.player.on(AudioPlayerStatus.Idle, () => {
			this.playNextSong();
		});
	}
	//add a song to the list
	addNode(name){
		let tempNode = SongNode(name);
		if(!this.head){//if list is empty make it the head
			this.head = tempNode;
			return;
		}

		let current = this.head;
		while(current.next){
			current = current.next;
		}
		current.next = tempNode;

		this.playNextSong();

	}

	playNextSong(){
		if(!this.head){
			return;
		}
		if(!this.head.resource){
			return;
		}
		if(this.player.AudioPlayerStatus === AudioPlayerStatus.Playing){
			return;
		}

		this.player.play(this.head.songResource);
		this.head = this.head.next;//remove the song from queue
	}

	forceNextSong(){
		if(!this.head){
			return;
		}
		if(!this.head.resource){
			return;
		}
		this.player.play(this.head.songResource);
		this.head = this.head.next;//remove the song from queue
	}

	//if the current call is the same, join, if not, do nothing.
	async checkJoinCall(interaction){
        try{
            this.newVoice = await interaction.member.fetch({force: true});
			console.log('got voice: ');
			this.myMember = await interaction.guild.members.fetch({force: true}, '1311470545887432856'); //hardcoded bot ID value
			console.log('got member');
            //this.myVoice = await  myMember.voice.fetch({force: true}, myMember);
            console.log('in voice');
        }
        catch(error){
            console.log('could not get voice!');
			console.log(error);
        }

		if(!this.newVoice.voice || !this.newVoice.voice.channelId){
			//interaction.followUp('Please join a channel!');
			return;
		}

		if(this.myMember.voice && this.newVoice.voice.channelId === this.myMember.voice.channelId){
            return;
        }

		console.log('joining channel!');
		this.connection = joinVoiceChannel(
		{
            channelId: interaction.member.voice.channelId,
            guildId: interaction.guildId,
            adapterCreator: interaction.member.guild.voiceAdapterCreator,
        });

		this.connection.once(VoiceConnectionStatus.Ready, () => {
            console.log('The connection has entered the Ready state - ready to play audio!');
            this.connection.subscribe(this.player);
    	});
	}

	leave(){
		if(this.connection){
			this.connection.destroy();
		}
		this.connection = null;
	}
}

let songList = new SongLinkedList();
const songPath = path.join(__dirname, 'songs');



client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;//make sure it is a / command

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
		
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}

	try{
		if(interaction.commandName === 'join'){
			await songList.checkJoinCall(interaction);
		}
		if(interaction.commandName === 'play'){
			await songList.checkJoinCall(interaction);
			const songName = interaction.options.getString('songname');
			songList.addNode((songName + '.mp3'));	
		}
	}
	catch(error){
		console.error(error);
	}
});


class SongNode{
	constructor(name){
		try{
			this.songResouce = createAudioResource(path.join(songPath, name));
		}
		catch{
			this.songResource = null;
			console.log('could not make resource!');
		}
		this.next=null;
	}
}

