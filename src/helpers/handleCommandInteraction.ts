import { Birthday, CoinFlip, EightBall } from '@/commands';
import { COPY } from '@/constants';
import { ChatInputCommandInteraction } from 'discord.js';

export const handleCommandInteraction = async (
  interaction: ChatInputCommandInteraction
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
};
