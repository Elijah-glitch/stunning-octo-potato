const { Client, Intents } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const luamin = require('luamin');

const config = require('./config.json');
const token = config.token;
const clientId = '940195181280518174';
const guildId = '1124697685019070555';

const client = new Client({ intents: [Intents.FLAGS.Guilds, Intents.FLAGS.GuildMessages] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  client.user.setPresence({ status: 'dnd' })
    .then(() => console.log('Bot status set to "Do Not Disturb"'))
    .catch(console.error);
});

const sendKeyCommand = {
  name: 'sendkey',
  description: 'Request a key for the Roblox key system GUI',
  options: [],
};

const obfuscateCommand = {
  name: 'obfuscate',
  description: 'Obfuscate Lua code',
  options: [
    {
      name: 'code',
      description: 'The Lua code to obfuscate',
      type: 'STRING',
      required: true,
    },
  ],
};

const commands = [sendKeyCommand, obfuscateCommand];
const rest = new REST({ version: '9' }).setToken(token);

(async () => {
  try {
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });
    console.log('Slash commands registered successfully!');
  } catch (error) {
    console.error('Error registering slash commands:', error);
  }
})();

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'sendkey') {
    const key = generateKey();
    try {
      const dmChannel = await interaction.user.createDM();
      await dmChannel.send(`Here is your key: ${key}`);
      await interaction.reply('A key has been sent to your DM.');
    } catch (error) {
      console.error('Error sending key:', error);
      await interaction.reply('An error occurred while sending the key.');
    }
  }

  if (commandName === 'obfuscate') {
    const code = options.getString('code');
    if (code) {
      const obfuscatedCode = luamin.minify(code);
      await interaction.reply(`Obfuscated code:\n\`\`\`${obfuscatedCode}\`\`\``);
    } else {
      await interaction.reply('Please provide Lua code to obfuscate.');
    }
  }
});

function generateKey() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let key = '';
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    key += characters[randomIndex];
  }
  return key;
}

client.login(token);
