import { Routes } from 'discord.js';
import { REST } from '@discordjs/rest';

import { Birthday, Bonus, CoinFlip, EightBall, Gamble, Leaderboard, Points } from '@/commands';
import { env } from '@/lib/configs';

export const register = (): void => {
  const commands = [
    Birthday.data.toJSON(),
    Bonus.data.toJSON(),
    CoinFlip.data.toJSON(),
    EightBall.data.toJSON(),
    Gamble.data.toJSON(),
    Leaderboard.data.toJSON(),
    Points.data.toJSON(),
  ];

  const rest = new REST({ version: '10' }).setToken(env.TOKEN);

  if (commands.length > 0)
    rest
      .put(Routes.applicationGuildCommands(env.CLIENT_ID, env.SERVER_ID), { body: commands })
      .then(_data => console.log('Discord PROD Commands Registered'))
      .catch(console.error);
};
