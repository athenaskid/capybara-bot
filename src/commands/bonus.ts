import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

import { CONFIG, COPY } from '@/constants';
import { reply } from '@/helpers';
import { findOrCreateUser, updateUser } from '@/services/user';

export const Bonus = {
  data: new SlashCommandBuilder()
    .setName(COPY.FEATURES.BONUS.NAME)
    .setDescription(COPY.FEATURES.BONUS.DESCRIPTION)
    .addUserOption((option) =>
      option
        .setName(COPY.FEATURES.BONUS.OPTION_USER_NAME)
        .setDescription(COPY.FEATURES.BONUS.OPTION_USER_DESCRIPTION)
        .setRequired(true),
    )
    .addIntegerOption((option) =>
      option
        .setName(COPY.FEATURES.BONUS.OPTION_AMOUNT_NAME)
        .setDescription(COPY.FEATURES.BONUS.OPTION_AMOUNT_DESCRIPTION)
        .setRequired(true)
        .setMinValue(1),
    ),
  execute: async (interaction: ChatInputCommandInteraction) => {
    if (!CONFIG.FEATURES.BONUS.ENABLED) {
      await reply({ content: COPY.DISABLED, ephemeral: true, interaction });
      return;
    }

    if (interaction.user.id !== interaction.guild?.ownerId) {
      await reply({
        content: 'Only the server owner can use this command.',
        ephemeral: true,
        interaction,
      });
      return;
    }

    const targetUser = interaction.options.getUser(COPY.FEATURES.BONUS.OPTION_USER_NAME, true);
    const amount = interaction.options.getInteger(COPY.FEATURES.BONUS.OPTION_AMOUNT_NAME, true);

    await findOrCreateUser(targetUser.id, targetUser.username);
    const updated = await updateUser({ discord_id: targetUser.id, points: amount });

    await reply({
      content: `Awarded ${amount} ${COPY.EMOJIS.CURRENCY} to <@${targetUser.id}>. Their new balance is ${updated?.points ?? amount} ${COPY.EMOJIS.CURRENCY}`,
      ephemeral: false,
      interaction,
    });
  },
};
