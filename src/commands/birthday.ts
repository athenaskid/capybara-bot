import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

import moment from 'moment-timezone';

import { CONFIG, COPY } from '@/constants';
import { reply } from '@/helpers';
import { isValidMonthDay } from '@/lib/utils';
import { createBirthday, getBirthday, updateBirthday } from '@/services/birthday';

const months = Array.from({ length: 12 }, (_, i) => ({
  name: new Date(0, i).toLocaleString('default', { month: 'long' }),
  value: i + 1,
}));

const timezones = COPY.TIMEZONES.map(tz => {
  const now = moment.tz(tz);
  const offset = now.format('Z');
  const abbreviation = (COPY.TIMEZONE_ABBREVIATIONS as Record<string, string>)[tz] || now.format('z');
  return { name: `UTC${offset} ${abbreviation}`, value: tz };
});

export const Birthday = {
  data: new SlashCommandBuilder()
    .setName(COPY.FEATURES.BIRTHDAY.NAME)
    .setDescription(COPY.FEATURES.BIRTHDAY.DESCRIPTION)
    .addNumberOption(option =>
      option
        .setName(COPY.FEATURES.BIRTHDAY.OPTION_MONTH_NAME)
        .setDescription(COPY.FEATURES.BIRTHDAY.OPTION_MONTH_DESCRIPTION)
        .setRequired(true)
        .addChoices(months),
    )
    .addNumberOption(option =>
      option
        .setName(COPY.FEATURES.BIRTHDAY.OPTION_DATE_NAME)
        .setDescription(COPY.FEATURES.BIRTHDAY.OPTION_DATE_DESCRIPTION)
        .setRequired(true),
    )
    .addStringOption(option =>
      option
        .setName(COPY.FEATURES.BIRTHDAY.OPTION_TIMEZONE_NAME)
        .setDescription(COPY.FEATURES.BIRTHDAY.OPTION_TIMEZONE_DESCRIPTION)
        .setRequired(true)
        .addChoices(timezones),
    ),
  execute: async (interaction: ChatInputCommandInteraction) => {
    if (!CONFIG.FEATURES.BIRTHDAY.ENABLED) {
      await reply({ content: COPY.DISABLED, ephemeral: true, interaction });
      return;
    }

    const birth_month = interaction.options.getNumber(COPY.FEATURES.BIRTHDAY.OPTION_MONTH_NAME, true);
    const birth_date = interaction.options.getNumber(COPY.FEATURES.BIRTHDAY.OPTION_DATE_NAME, true);
    const timezone = interaction.options.getString(COPY.FEATURES.BIRTHDAY.OPTION_TIMEZONE_NAME, true);

    if (!isValidMonthDay(birth_month, birth_date)) {
      await reply({ content: 'Please enter a valid Month and Day combination.', ephemeral: true, interaction });
      return;
    }

    const monthName = new Date(0, birth_month - 1).toLocaleString('default', { month: 'long' });
    const payload = { discord_id: interaction.user.id, birth_month, birth_date, timezone };
    const userBirthday = await getBirthday(interaction.user.id);

    if (userBirthday) {
      const hasBeenUpdated = userBirthday.created_at.getTime() !== userBirthday.updated_at.getTime();

      if (hasBeenUpdated) {
        await reply({ content: 'You can only update your birthday once.', ephemeral: true, interaction });
        return;
      }

      await updateBirthday(interaction.user.id, payload);
      await reply({ content: `Your birthday has been updated to ${monthName} ${birth_date}`, ephemeral: false, interaction });
      return;
    }

    await createBirthday(payload);
    await reply({ content: `Success! Your birthday on ${monthName} ${birth_date} has been saved.`, ephemeral: false, interaction });
  },
};
