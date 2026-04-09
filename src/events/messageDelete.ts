import { Message, PartialMessage } from 'discord.js';
import { log } from '@/helpers';

export const onMessageDelete = async (message: Message | PartialMessage) => {
  let logMessage = `Message Deleted In: ${message.channel}\nAuthor: ${message.author?.username}`;

  if (message.cleanContent) {
    logMessage += `\n\nContent: ${message.cleanContent}`;
  }

  if (message.attachments.size > 0) {
    logMessage += `\n\nAttached Files:`;
    message.attachments.forEach(attachment => {
      logMessage += `\n${attachment.url}`;
    });
  }

  log({
    description: logMessage,
    thumbnail: message.author?.displayAvatarURL(),
    footer: `Discord User ID: ${message.author?.id}\nPosted on ${message.createdAt}`,
  });
};
