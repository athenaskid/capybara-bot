import { ColorResolvable, EmbedBuilder, MessageFlags } from 'discord.js';

import { CONFIG } from '@/constants';
import { ReplyProps } from '@/interfaces/bot';

/**
 * Replies to an interaction with a branded embed.
 * @param props.ephemeral - If true, the reply is only visible to the invoking user.
 */
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
