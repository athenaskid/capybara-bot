import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

import { CONFIG, COPY } from '@/constants';
import { reply } from '@/helpers';
import { weightedRandom } from '@/lib/utils';

export const CoinFlip = {
  data: new SlashCommandBuilder()
    .setName(COPY.FEATURES.COINFLIP.NAME)
    .setDescription(COPY.FEATURES.COINFLIP.DESCRIPTION),
  execute: async (interaction: ChatInputCommandInteraction) => {
    if (!CONFIG.FEATURES.COINFLIP.ENABLED) {
      await reply({ content: COPY.DISABLED, ephemeral: true, interaction });
      return;
    }

    const result = weightedRandom({ Heads: 0.5, Tails: 0.5 });
    await reply({ content: `You got... ${result}!`, ephemeral: false, interaction });
  },
};
