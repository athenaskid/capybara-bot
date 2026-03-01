import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

import { CONFIG, COPY } from '@/constants';
import { reply } from '@/helpers';
import { UserDocument } from '@/interfaces/user';

export const Points = {
  data: new SlashCommandBuilder()
    .setName(COPY.FEATURES.POINTS.NAME)
    .setDescription(COPY.FEATURES.POINTS.DESCRIPTION),
  execute: async (interaction: CommandInteraction, user: UserDocument) => {
    if (!CONFIG.FEATURES.POINTS.ENABLED) {
      reply({
        content: COPY.DISABLED,
        ephemeral: true,
        interaction: interaction,
      });
      return;
    }

    reply({
      content: `Your current balance is: ${user.points} ${COPY.EMOJIS.CURRENCY}`,
      ephemeral: false,
      interaction: interaction,
    });
  },
};
