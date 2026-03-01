import { ChatInputCommandInteraction } from 'discord.js';

import { Birthday, CoinFlip, EightBall, Gamble, Points } from '@/commands';
import { COPY } from '@/constants';
import { findOrCreateUser } from '@/services/user';

export const handleCommandInteraction = async (
  interaction: ChatInputCommandInteraction,
) => {
  if (interaction.user.bot) return;

  if (interaction.commandName === COPY.FEATURES.BIRTHDAY.NAME) {
    return Birthday.execute(interaction);
  }

  if (interaction.commandName === COPY.FEATURES.COINFLIP.NAME) {
    return CoinFlip.execute(interaction);
  }

  if (interaction.commandName === COPY.FEATURES.EIGHTBALL.NAME) {
    return EightBall.execute(interaction);
  }

  if (interaction.commandName === COPY.FEATURES.GAMBLE.NAME) {
    const user = await findOrCreateUser(
      interaction.user.id,
      interaction.user.username,
    );

    return Gamble.execute(interaction, user);
  }

  if (interaction.commandName === COPY.FEATURES.POINTS.NAME) {
    const user = await findOrCreateUser(
      interaction.user.id,
      interaction.user.username,
    );

    return Points.execute(interaction, user);
  }
};
