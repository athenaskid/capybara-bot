import { ColorResolvable, EmbedBuilder, MessageFlags } from 'discord.js';

import { CONFIG } from '@/constants';
import { ReplyProps } from '@/interfaces/bot';

export const reply = async ({
  content,
  ephemeral,
  interaction,
}: ReplyProps) => {
  try {
    const botEmbed = new EmbedBuilder()
      .setColor(CONFIG.COLORS.RED as ColorResolvable)
      .setDescription(content);

    await interaction.reply({
      embeds: [botEmbed],
      ...(ephemeral && { flags: MessageFlags.Ephemeral }),
    });
  } catch (error) {
    console.error(error);
  }
};
