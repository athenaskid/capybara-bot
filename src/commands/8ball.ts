import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

import { CONFIG, COPY } from '@/constants';
import { reply } from '@/helpers';

export const EightBall = {
  data: new SlashCommandBuilder()
    .setName(COPY.FEATURES.EIGHTBALL.NAME)
    .setDescription(COPY.FEATURES.EIGHTBALL.DESCRIPTION)
    .addStringOption(option =>
      option
        .setName(COPY.FEATURES.EIGHTBALL.OPTION_NAME)
        .setDescription(COPY.FEATURES.EIGHTBALL.OPTION_DESCRIPTION)
        .setRequired(true),
    ),
  execute: async (interaction: ChatInputCommandInteraction) => {
    if (!CONFIG.FEATURES.EIGHTBALL.ENABLED) {
      await reply({ content: COPY.DISABLED, ephemeral: true, interaction });
      return;
    }

    const responses = COPY.FEATURES.EIGHTBALL.RESPONSES;
    const answer = responses[Math.floor(Math.random() * responses.length)];

    await reply({ content: `:8ball: says... ${answer}`, ephemeral: false, interaction });
  },
};
