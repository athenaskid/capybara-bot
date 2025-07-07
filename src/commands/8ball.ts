import {
  CommandInteraction,
  SlashCommandBuilder,
  SlashCommandStringOption,
} from 'discord.js';

import { CONFIG, COPY } from '@/constants';
import { reply } from '@/helpers';

export const EightBall = {
  data: new SlashCommandBuilder()
    .setName(COPY.FEATURES.EIGHTBALL.NAME)
    .setDescription(COPY.FEATURES.EIGHTBALL.DESCRIPTION)
    .addStringOption((option: SlashCommandStringOption) =>
      option
        .setName(COPY.FEATURES.EIGHTBALL.OPTION_NAME)
        .setDescription(COPY.FEATURES.EIGHTBALL.OPTION_DESCRIPTION)
        .setRequired(true)
    ),
  execute: async (interaction: CommandInteraction) => {
    if (!CONFIG.FEATURES.EIGHTBALL.ENABLED) {
      reply({
        content: COPY.DISABLED,
        ephemeral: true,
        interaction: interaction,
      });
      return;
    }

    const randomNum = Math.floor(
      Math.random() * COPY.FEATURES.EIGHTBALL.RESPONSES.length
    );

    const answer = COPY.FEATURES.EIGHTBALL.RESPONSES[randomNum];

    reply({
      content: `:8ball: says... ${answer}`,
      ephemeral: false,
      interaction: interaction,
    });
  },
};
