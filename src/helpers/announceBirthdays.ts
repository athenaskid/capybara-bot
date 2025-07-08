import moment from 'moment-timezone';

import { CONFIG, COPY } from '@/constants';
import { discord } from '@/lib/clients';
import { getENV } from '@/lib/configs';
import { getBirthdays } from '@/services/birthday';

const sendGreetings = async (celebrants: string[]) => {
  const { SERVER_ID } = getENV();

  const server = discord.guilds.cache.get(SERVER_ID);
  if (!server || !server.available) return;

  const channel = server.channels.cache.get(CONFIG.FEATURES.BIRTHDAY.CHANNEL);
  if (!channel || !channel.isTextBased()) return;

  const mentions = [];

  for (const id of celebrants) {
    try {
      const user = await discord.users.fetch(id);
      mentions.push(`<@${user.id}>`);
    } catch (error) {
      console.error(`Failed to fetch discord user ${id}:`, error);
    }
  }

  if (mentions.length === 0) return;

  channel.send(
    `Hello @everyone! Let's wish ${mentions.join(' ')} a happy birthday! ${
      COPY.EMOJIS.BALLOONS
    }`
  );
};

export const announceBirthdays = async () => {
  for (const timezone of COPY.TIMEZONES) {
    const nowInTZ = moment().tz(timezone);
    const month = nowInTZ.month() + 1;
    const date = nowInTZ.date();

    if (nowInTZ.hour() === 0 && nowInTZ.minute() === 0) {
      const birthdays = await getBirthdays(month, date, timezone);

      if (birthdays) {
        const celebrants = birthdays.map(birthday => {
          return birthday.discord_id;
        });

        sendGreetings(celebrants);
      }
    }
  }
};
