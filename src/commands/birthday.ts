import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandNumberOption,
  SlashCommandStringOption,
} from 'discord.js';

import moment from 'moment-timezone';

import { CONFIG, COPY } from '@/constants';
import { reply } from '@/helpers';

import {
  createBirthday,
  getBirthday,
  updateBirthday,
} from '@/services/birthday';

import { isValidMonthDay } from '@/lib/utils/isValidMonthDay';

const months = Array.from({ length: 12 }, (_, i) => ({
  name: new Date(0, i).toLocaleString('default', { month: 'long' }),
  value: i + 1,
}));

// Note: Some timezones don't return an abbrevation when formatted so we manually add them.
const tzAbberviations: Record<string, string> = COPY.TIMEZONE_ABBREVIATIONS;

const timezones = COPY.TIMEZONES.map(tz => {
  const now = moment.tz(tz);
  const offset = now.format('Z');
  const abbreviation = tzAbberviations[tz] || now.format('z');

  return {
    name: `UTC${offset} ${abbreviation}`,
    value: tz,
  };
});

export const Birthday = {
  data: new SlashCommandBuilder()
    .setName(COPY.FEATURES.BIRTHDAY.NAME)
    .setDescription(COPY.FEATURES.BIRTHDAY.DESCRIPTION)
    .addNumberOption((option: SlashCommandNumberOption) =>
      option
        .setName(COPY.FEATURES.BIRTHDAY.OPTION_MONTH_NAME)
        .setDescription(COPY.FEATURES.BIRTHDAY.OPTION_MONTH_DESCRIPTION)
        .setRequired(true)
        .addChoices(months)
    )
    .addNumberOption((option: SlashCommandNumberOption) =>
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

    const selectedMonth = interaction.options.getNumber(
      COPY.FEATURES.BIRTHDAY.OPTION_MONTH_NAME
    );

    const selectedDate = interaction.options.getNumber(
      COPY.FEATURES.BIRTHDAY.OPTION_DATE_NAME
    );

    const selectedTimezone = interaction.options.getString(
      COPY.FEATURES.BIRTHDAY.OPTION_TIMEZONE_NAME
    );

    if (!isValidMonthDay(selectedMonth!, selectedDate!)) {
      reply({
        content: 'Please enter a valid Month and Day combination.',
        ephemeral: true,
        interaction: interaction,
      });
      return;
    }

    const payload = {
      discord_id: interaction.user.id,
      birth_month: selectedMonth!,
      birth_date: selectedDate!,
      timezone: selectedTimezone!,
    };

    const selectedMonthName = new Date(0, selectedMonth! - 1).toLocaleString(
      'default',
      { month: 'long' }
    );

    const userBirthday = await getBirthday(interaction.user.id);

    if (userBirthday) {
      const createdTime = userBirthday.created_at.getTime();
      const updatedTime = userBirthday.updated_at.getTime();
      const isRecent = createdTime === updatedTime;

      if (isRecent) {
        await updateBirthday(interaction.user.id, payload);

        reply({
          content: `Your birthday has been updated to ${selectedMonthName} ${selectedDate}`,
          ephemeral: false,
          interaction: interaction,
        });
      } else {
        reply({
          content: 'You can only update your birthday once.',
          ephemeral: true,
          interaction: interaction,
        });
      }

      return;
    }

    await createBirthday(payload);

    reply({
      content: `Success! Your birthday on ${selectedMonthName} ${selectedDate} has been saved.`,
      ephemeral: false,
      interaction: interaction,
    });
  },
};
