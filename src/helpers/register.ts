import { Routes } from 'discord.js';
import { REST } from '@discordjs/rest';

import { EightBall } from '@/commands';

export const register = (): void => {
  if (!process.env.TOKEN) {
    console.error('Error: Discord Register Command Missing Token.');
    process.exit(1);
  }

  if (!process.env.CLIENT_ID) {
    console.error('Error: Discord Register Command Missing Client ID.');
    process.exit(1);
  }

  if (!process.env.SERVER_ID) {
    console.error('Error: Discord Register Command Missing Server ID.');
    process.exit(1);
  }

  const commands = [];

  // commands ready for production should be added here
  commands.push(EightBall.data.toJSON());

  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

  if (commands.length > 0)
    rest
      .put(
        Routes.applicationGuildCommands(
          process.env.CLIENT_ID,
          process.env.SERVER_ID
        ),
        { body: commands }
      )
      .then(_data => console.log('Discord PROD Commands Registered'))
      .catch(console.error);
};
