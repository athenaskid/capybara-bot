import moment from 'moment-timezone';

import { CONFIG, COPY } from '@/constants';
import { discord } from '@/lib/clients';
import { env } from '@/lib/configs';
import { getBirthdays } from '@/services/birthday';

const sendGreetings = async (celebrants: string[]) => {
  const server = discord.guilds.cache.get(env.SERVER_ID);
  if (!server || !server.available) return;

  const channel = server.channels.cache.get(CONFIG.FEATURES.BIRTHDAY.CHANNEL);
  if (!channel || !channel.isTextBased()) return;

  const mentions = celebrants.map(id => `<@${id}>`);
  if (mentions.length === 0) return;

  await channel.send(
    `Hello @everyone! Let's wish ${mentions.join(' ')} a happy birthday! ${COPY.EMOJIS.BALLOONS}`
  );
};

/**
 * Iterates every configured timezone and, at midnight in that timezone,
 * fetches matching birthdays and sends a mention to the birthday channel.
 * Intended to be called on a recurring cron schedule (e.g. every 30 minutes).
 */
export const announceBirthdays = async () => {
  for (const timezone of COPY.TIMEZONES) {
    const nowInTZ = moment().tz(timezone);

    if (nowInTZ.hour() !== 0 || nowInTZ.minute() !== 0) continue;

    const month = nowInTZ.month() + 1;
    const date = nowInTZ.date();
    const birthdays = await getBirthdays(month, date, timezone);

    if (birthdays.length === 0) continue;

    await sendGreetings(birthdays.map(b => b.discord_id));
  }
};
