import { Client, GatewayIntentBits } from 'discord.js';

import { env } from '@/lib/configs';

const discord = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
  ],
});

discord.on('clientReady', () => {
  console.log('CapybaraBot: Discord.js Connected');

  discord.user?.setActivity({
    name: env.STAGING ? 'TEST MODE' : 'with Jensetters',
    type: 0,
  });
});

discord.login(env.TOKEN);

export { discord };
