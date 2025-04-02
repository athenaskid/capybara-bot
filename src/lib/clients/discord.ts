import { Client, GatewayIntentBits } from 'discord.js';

if (!process.env.TOKEN) {
  console.error('Error: Discord.js Missing Environment Variables');
  process.exit(1);
}

const discord = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.Guilds,
  ],
});

discord.on('ready', () => {
  console.log('CapybaraBot: Discord.js Connected');

  discord.user?.setActivity({
    name: process.env.STAGING ? 'TEST MODE' : 'with Jensetters',
    type: 0,
  });
});

discord.login(process.env.TOKEN);

export { discord };
