import { ChatInputCommandInteraction } from 'discord.js';

import { Birthday, Bonus, CoinFlip, EightBall, Gamble, Leaderboard, Points } from '@/commands';
import { COPY } from '@/constants';
import { findOrCreateUser } from '@/services/user';

export const handleCommandInteraction = async (
  interaction: ChatInputCommandInteraction,
) => {
  if (interaction.user.bot) return;

  switch (interaction.commandName) {
    case COPY.FEATURES.BONUS.NAME:
      return Bonus.execute(interaction);

    case COPY.FEATURES.LEADERBOARD.NAME:
      return Leaderboard.execute(interaction);

    case COPY.FEATURES.BIRTHDAY.NAME:
      return Birthday.execute(interaction);

    case COPY.FEATURES.COINFLIP.NAME:
      return CoinFlip.execute(interaction);

    case COPY.FEATURES.EIGHTBALL.NAME:
      return EightBall.execute(interaction);

    case COPY.FEATURES.GAMBLE.NAME: {
      const user = await findOrCreateUser(interaction.user.id, interaction.user.username);
      return Gamble.execute(interaction, user);
    }

    case COPY.FEATURES.POINTS.NAME: {
      const user = await findOrCreateUser(interaction.user.id, interaction.user.username);
      return Points.execute(interaction, user);
    }
  }
};
