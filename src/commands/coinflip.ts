import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

import { CONFIG, COPY } from '@/constants';
import { reply } from '@/helpers';
import { weightedRandom } from '@/lib/utils';

export const CoinFlip = {
  data: new SlashCommandBuilder()
    .setName(COPY.FEATURES.COINFLIP.NAME)
    .setDescription(COPY.FEATURES.COINFLIP.DESCRIPTION),
  execute: async (interaction: CommandInteraction) => {
    if (!CONFIG.FEATURES.COINFLIP.ENABLED) {
      reply({
        content: COPY.DISABLED,
        ephemeral: true,
        interaction: interaction,
      });
      return;
    }

    const probability = { Heads: 0.5, Tails: 0.5 };
    const result = weightedRandom(probability);

    reply({
      content: `You got... ${result}!`,
      ephemeral: false,
      interaction: interaction,
    });
  },
};
