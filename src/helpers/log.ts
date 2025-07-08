import { ColorResolvable, EmbedBuilder } from 'discord.js';

import { CONFIG } from '@/constants';
import { LogProps } from '@/interfaces/bot';

import { discord } from '@/lib/clients';
import { getENV } from '@/lib/configs';

export const log = ({
  title,
  description,
  image,
  authorIcon,
  thumbnail,
  footer,
}: LogProps) => {
  const { SERVER_ID } = getENV();

  const server = discord.guilds.cache.get(SERVER_ID);

  if (server && server.available) {
    const channel = server.channels.cache.get(CONFIG.LOGS.CHANNEL);

    if (channel) {
      const botEmbed = new EmbedBuilder()
        .setColor(CONFIG.COLORS.RED as ColorResolvable)
        .setDescription(description);

      if (authorIcon) {
        botEmbed.setAuthor({
          name: `${server.name} Server`,
          iconURL: authorIcon || server.iconURL() || '',
        });
      }

      if (title) botEmbed.setTitle(title);
      if (image) botEmbed.setImage(image);
      if (thumbnail) botEmbed.setThumbnail(thumbnail);
      if (footer) botEmbed.setFooter({ text: footer });

      if (channel.isTextBased()) channel.send({ embeds: [botEmbed] });
    }
  }
};
