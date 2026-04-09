import { Message } from 'discord.js';

import { env } from '@/lib/configs';
import { updateUser } from '@/services/user';

const WORD_REGEX = /[A-Za-z].{2,}/;

export const onMessageCreate = async (message: Message) => {
  if (message.author.bot) return;
  if (message.author.system) return;
  if (!message.guild?.available) return;
  if (!message.channel.isTextBased()) return;
  if (!message.member) return;
  if (message.guild.id !== env.SERVER_ID) return;

  const words = message.content.split(/ +/g);
  const isValidMsg = words.length > 2 && words.some(word => WORD_REGEX.test(word));
  const isValidAttachment = !!message.attachments.first();

  if (!isValidMsg && !isValidAttachment) return;

  await updateUser({
    discord_id: message.member.id,
    discord_username: message.author.username,
    points: isValidAttachment ? 2 : 1,
  });
};
