import { Message } from 'discord.js';

import { CONFIG } from '@/constants';
import { fixTwitterLinks } from '@/lib/utils';

const MAX_MESSAGE_LENGTH = 2000;

export const handleTwitterLinks = async (message: Message) => {
  if (!CONFIG.FEATURES.LINK_FIXER.ENABLED) return;
  if (!message.channel.isSendable()) return;

  const fixed = fixTwitterLinks(message.content);
  if (!fixed) return;

  const content = `${message.author}: ${fixed}`;
  if (content.length > MAX_MESSAGE_LENGTH) return;

  const files = message.attachments.map(attachment => attachment.url);

  try {
    await message.delete();
  } catch (error) {
    console.error('CapybaraBot: Failed to delete message for link fixing', error);
    return;
  }

  await message.channel.send({ content, files, allowedMentions: { parse: [] } });
};
