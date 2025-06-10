// Require the necessary discord.js classes
const { token } = require('./config.json');

const fs = require('node:fs');//fs is native file system
const path = require('node:path');//path is the path to the file
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');



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
let songList = SongLinkedList();

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
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});


class SongNode{
	constructor(resource){
		this.songResouce = resource;
		this.next=null;
	}
}

class SongLinkedList{
	constructor(){
		this.head=null;
		this.next=null;
		this.player = createAudioPlayer();
	}

	addNode(name){
		let tempNode = SongNode(name);
		if(!this.head){
			this.head = tempNode;
			return;
		}
		let current = this.head;
		while(current.next){
			current = current.next;
		}
		current.next = tempNode;
	}

	playNextSong(){
		if(this.head.songResource){//play the next song 
			this.player.play(this.head.songResource);
		}
		this.head = this.head.next;//remove the song from queue
	}
}

class connector{
	constructor(player){

	}
}
