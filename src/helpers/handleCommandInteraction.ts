import { CoinFlip, EightBall } from '@/commands';
import { COPY } from '@/constants';
import { CommandInteraction } from 'discord.js';

export const handleCommandInteraction = async (
  interaction: CommandInteraction
) => {
  if (interaction.user.bot) return;

  if (interaction.commandName === COPY.FEATURES.COINFLIP.NAME) {
    return CoinFlip.execute(interaction);
  }

  if (interaction.commandName === COPY.FEATURES.EIGHTBALL.NAME) {
    return EightBall.execute(interaction);
  }
};
