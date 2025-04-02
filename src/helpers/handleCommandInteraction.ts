import { EightBall } from '@/commands';
import { COPY } from '@/constants';
import { CommandInteraction } from 'discord.js';

export const handleCommandInteraction = async (
  interaction: CommandInteraction
) => {
  if (interaction.user.bot) return;

  if (interaction.commandName === COPY.FEATURES.EIGHTBALL.NAME) {
    return EightBall.execute(interaction);
  }
};
