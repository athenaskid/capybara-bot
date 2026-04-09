import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

import { CONFIG, COPY } from '@/constants';
import { reply } from '@/helpers';
import { UserDocument } from '@/interfaces/user';
import { getCurrency, weightedRandom } from '@/lib/utils';
import { updateUser } from '@/services/user';

export const Gamble = {
  data: new SlashCommandBuilder()
    .setName(COPY.FEATURES.GAMBLE.NAME)
    .setDescription(COPY.FEATURES.GAMBLE.DESCRIPTION)
    .addStringOption(option =>
      option
        .setName(COPY.FEATURES.GAMBLE.OPTION_NAME)
        .setDescription(COPY.FEATURES.GAMBLE.OPTION_DESCRIPTION)
        .setRequired(true),
    ),
  execute: async (
    interaction: ChatInputCommandInteraction,
    user: UserDocument,
  ) => {
    if (!CONFIG.FEATURES.GAMBLE.ENABLED) {
      await reply({ content: COPY.DISABLED, ephemeral: true, interaction });
      return;
    }

    if (user.points < 1) {
      await reply({ content: `You have no ${CONFIG.CURRENCY.SINGLE} to gamble.`, ephemeral: true, interaction });
      return;
    }

    const arg = interaction.options.getString(COPY.FEATURES.GAMBLE.OPTION_NAME, true);
    const amount = parseInt(arg, 10);

    if (isNaN(amount) && arg !== 'all' && arg !== 'half') {
      await reply({ content: 'Enter a specific number, "all", or "half".', ephemeral: true, interaction });
      return;
    }

    if (!isNaN(amount) && amount < 1) {
      await reply({ content: `You should gamble at least 1 ${CONFIG.CURRENCY.SINGLE}.`, ephemeral: true, interaction });
      return;
    }

    if (!isNaN(amount) && amount > user.points) {
      await reply({ content: `You don't have enough ${CONFIG.CURRENCY.PLURAL} to gamble.`, ephemeral: true, interaction });
      return;
    }

    const probability = {
      win: CONFIG.FEATURES.GAMBLE.WIN_PERCENT / 100,
      loss: 1 - CONFIG.FEATURES.GAMBLE.WIN_PERCENT / 100,
    };

    const won = weightedRandom(probability) === 'win';

    let incAmount: number;
    let content: string;

    if (arg === 'all') {
      incAmount = won ? user.points : -user.points;
      content = won
        ? `You won ${user.points} ${getCurrency(user.points)}! ${COPY.EMOJIS.GAMBLE_WON} Current balance: ${user.points + incAmount} ${COPY.EMOJIS.CURRENCY}`
        : `You lost all of your ${CONFIG.CURRENCY.PLURAL}. ${COPY.EMOJIS.GAMBLE_LOST}`;
    } else if (arg === 'half') {
      const half = Math.round(user.points / 2);
      incAmount = won ? half : -half;
      content = won
        ? `You won ${half} ${getCurrency(half)}! ${COPY.EMOJIS.GAMBLE_WON} Current balance: ${user.points + incAmount} ${COPY.EMOJIS.CURRENCY}`
        : `You lost ${half} ${getCurrency(half)}. ${COPY.EMOJIS.GAMBLE_LOST} Current balance: ${user.points + incAmount} ${COPY.EMOJIS.CURRENCY}`;
    } else {
      incAmount = won ? amount : -amount;
      content = won
        ? `You won ${amount} ${getCurrency(amount)}! ${COPY.EMOJIS.GAMBLE_WON} Current balance: ${user.points + incAmount} ${COPY.EMOJIS.CURRENCY}`
        : `You lost ${amount} ${getCurrency(amount)}. ${COPY.EMOJIS.GAMBLE_LOST} Current balance: ${user.points + incAmount} ${COPY.EMOJIS.CURRENCY}`;
    }

    await updateUser({
      discord_id: interaction.user.id,
      discord_username: interaction.user.username,
      points: incAmount,
    });

    await reply({ content, ephemeral: false, interaction });
  },
};
