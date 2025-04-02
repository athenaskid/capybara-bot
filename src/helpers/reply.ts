import { ColorResolvable, EmbedBuilder } from 'discord.js';

import { CONFIG } from '@/constants';
import { ReplyProps } from '@/interfaces/bot';

export const reply = async ({
  content,
  ephimeral,
  interaction,
}: ReplyProps) => {
  try {
    const botEmbed = new EmbedBuilder()
      .setColor(CONFIG.COLORS.RED as ColorResolvable)
      .setDescription(content);

    await interaction.reply({ embeds: [botEmbed], ephemeral: ephimeral });
  } catch (error) {
    console.error(error);
  }
};
