import { Message } from 'discord.js';

import { getENV } from '@/lib/configs';
import { updateUser } from '@/services/user';

export const onMessageCreate = async (message: Message) => {
  if (message.author.bot) return;
  if (message.author.system) return;
  if (!message.guild?.available) return;
  if (!message.channel.isTextBased()) return;
  if (!message.member) return;

  const { SERVER_ID } = getENV();

  if (message.guild.id !== SERVER_ID) return;

  const words = message.content.split(/ +/g);
  const wordRegex = new RegExp('[A-Za-z].{2,}');

  const isValidMsg =
    words.length > 2 && words.some(word => wordRegex.test(word));
  const isValidAttachment = !!message.attachments.first();

  const incAmount = isValidAttachment ? 2 : 1;
  const isValid = isValidMsg || isValidAttachment;

  if (!isValid) return;

  await updateUser({
    discord_id: message.member.id,
    discord_username: message.author.username,
    points: incAmount,
  });
};
