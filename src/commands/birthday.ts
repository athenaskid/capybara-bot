import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandStringOption,
} from 'discord.js';

import { CONFIG, COPY } from '@/constants';
import { reply } from '@/helpers';

const months = Array.from({ length: 12 }, (_, i) => ({
  name: new Date(0, i).toLocaleString('default', { month: 'long' }),
  value: (i + 1).toString().padStart(2, '0'),
}));

// @todo: Update the list of timezones (max of 25 options)
const timezones = [
  { name: 'UTC -08 (PST)', value: 'PST' },
  { name: 'UTC -05 (EST)', value: 'EST' },
  { name: 'UTC +00 (UTC)', value: 'UTC' },
  { name: 'UTC +01 (CET)', value: 'CET' },
  { name: 'UTC +08 (CST)', value: 'CST' },
];

export const Birthday = {
  data: new SlashCommandBuilder()
    .setName(COPY.FEATURES.BIRTHDAY.NAME)
    .setDescription(COPY.FEATURES.BIRTHDAY.DESCRIPTION)
    .addStringOption((option: SlashCommandStringOption) =>
      option
        .setName(COPY.FEATURES.BIRTHDAY.OPTION_MONTH_NAME)
        .setDescription(COPY.FEATURES.BIRTHDAY.OPTION_MONTH_DESCRIPTION)
        .setRequired(true)
        .addChoices(months)
    )
    .addStringOption((option: SlashCommandStringOption) =>
      option
        .setName(COPY.FEATURES.BIRTHDAY.OPTION_DATE_NAME)
        .setDescription(COPY.FEATURES.BIRTHDAY.OPTION_DATE_DESCRIPTION)
        .setRequired(true)
    )
    .addStringOption((option: SlashCommandStringOption) =>
      option
        .setName(COPY.FEATURES.BIRTHDAY.OPTION_TIMEZONE_NAME)
        .setDescription(COPY.FEATURES.BIRTHDAY.OPTION_TIMEZONE_DESCRIPTION)
        .setRequired(true)
        .addChoices(timezones)
    ),
  execute: async (interaction: ChatInputCommandInteraction) => {
    if (!CONFIG.FEATURES.BIRTHDAY.ENABLED) {
      reply({
        content: COPY.DISABLED,
        ephemeral: true,
        interaction: interaction,
      });
      return;
    }

    const selectedMonth = interaction.options.getString(
      COPY.FEATURES.BIRTHDAY.OPTION_MONTH_NAME
    );

    const selectedDate = interaction.options.getString(
      COPY.FEATURES.BIRTHDAY.OPTION_DATE_NAME
    );

    const selectedTimezone = interaction.options.getString(
      COPY.FEATURES.BIRTHDAY.OPTION_TIMEZONE_NAME
    );

    reply({
      content: `success: ${selectedMonth} ${selectedDate} ${selectedTimezone}`,
      ephemeral: false,
      interaction: interaction,
    });
  },
};
