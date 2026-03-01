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
      reply({
        content: COPY.DISABLED,
        ephemeral: true,
        interaction: interaction,
      });
      return;
    }

    const replies = {
      invalidInput: 'Enter a specific number, "all", or "half".',
      invalidNegative: `You should gamble at least 1 ${CONFIG.CURRENCY.SINGLE}.`,
      lostAll: `You lost all of your ${CONFIG.CURRENCY.PLURAL}. ${COPY.EMOJIS.GAMBLE_LOST}`,
      noPoints: `You have no ${CONFIG.CURRENCY.SINGLE} to gamble.`,
      notEnough: `You don't have enough ${CONFIG.CURRENCY.PLURAL} to gamble.`,
    };

    if (user.points < 1) {
      reply({
        content: replies.noPoints,
        ephemeral: true,
        interaction: interaction,
      });
      return;
    }

    const arg = interaction.options.get('amount')?.value;
    const amount = typeof arg === 'string' ? parseInt(arg, 10) : 0;

    if (isNaN(amount) && arg !== 'all' && arg !== 'half') {
      reply({
        content: replies.invalidInput,
        ephemeral: true,
        interaction: interaction,
      });
      return;
    }

    const probability = {
      win: CONFIG.FEATURES.GAMBLE.WIN_PERCENT / 100,
      loss: 1 - CONFIG.FEATURES.GAMBLE.WIN_PERCENT / 100,
    };

    let incAmount = 0;

    const result = weightedRandom(probability);

    if (arg === 'all') {
      if (result === 'win') {
        incAmount += user.points;

        reply({
          content: `You won ${user.points} ${getCurrency(user.points)}! ${
            COPY.EMOJIS.GAMBLE_WON
          } Current balance: ${user.points + incAmount} ${COPY.EMOJIS.CURRENCY}`,
          ephemeral: false,
          interaction: interaction,
        });
      } else {
        incAmount -= user.points;

        reply({
          content: replies.lostAll,
          ephemeral: false,
          interaction: interaction,
        });
      }
    } else if (arg === 'half') {
      const halfPoints = Math.round(user.points / 2);

      if (result === 'win') {
        incAmount += halfPoints;

        reply({
          content: `You won ${halfPoints} ${getCurrency(halfPoints)}! ${
            COPY.EMOJIS.GAMBLE_WON
          } Current balance: ${user.points + incAmount} ${COPY.EMOJIS.CURRENCY}`,
          ephemeral: false,
          interaction: interaction,
        });
      } else {
        incAmount -= halfPoints;

        reply({
          content: `You lost ${halfPoints} ${getCurrency(halfPoints)}. ${
            COPY.EMOJIS.GAMBLE_LOST
          } Current balance: ${user.points + incAmount} ${COPY.EMOJIS.CURRENCY}`,
          ephemeral: false,
          interaction: interaction,
        });
      }
    } else if (amount < 1) {
      reply({
        content: replies.invalidNegative,
        ephemeral: true,
        interaction: interaction,
      });
    } else if (amount <= user.points) {
      if (result === 'win') {
        incAmount += amount;

        reply({
          content: `You won ${amount} ${getCurrency(amount)}! ${
            COPY.EMOJIS.GAMBLE_WON
          } Current balance: ${user.points + incAmount} ${COPY.EMOJIS.CURRENCY}`,
          ephemeral: false,
          interaction: interaction,
        });
      } else {
        incAmount -= amount;

        reply({
          content: `You lost ${amount} ${getCurrency(amount)}. ${
            COPY.EMOJIS.GAMBLE_LOST
          } Current balance: ${user.points + incAmount} ${COPY.EMOJIS.CURRENCY}`,
          ephemeral: false,
          interaction: interaction,
        });
      }
    } else if (amount > user.points) {
      reply({
        content: replies.notEnough,
        ephemeral: true,
        interaction: interaction,
      });
      return;
    }

    await updateUser({
      discord_id: interaction.user.id,
      discord_username: interaction.user.username,
      points: incAmount,
    });

    reply({
      content: `Your current balance is: ${user.points} ${COPY.EMOJIS.CURRENCY}`,
      ephemeral: false,
      interaction: interaction,
    });
  },
};
