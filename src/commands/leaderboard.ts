import {
  ChatInputCommandInteraction,
  ColorResolvable,
  EmbedBuilder,
  SlashCommandBuilder,
} from 'discord.js';

import { CONFIG, COPY } from '@/constants';
import { reply } from '@/helpers';
import { getTopUsers } from '@/services/user';

export const Leaderboard = {
  data: new SlashCommandBuilder()
    .setName(COPY.FEATURES.LEADERBOARD.NAME)
    .setDescription(COPY.FEATURES.LEADERBOARD.DESCRIPTION),
  execute: async (interaction: ChatInputCommandInteraction) => {
    if (!CONFIG.FEATURES.LEADERBOARD.ENABLED) {
      await reply({ content: COPY.DISABLED, ephemeral: true, interaction });
      return;
    }

    const users = await getTopUsers(CONFIG.FEATURES.LEADERBOARD.LIMIT);

    if (users.length === 0) {
      await reply({ content: 'No users found.', ephemeral: true, interaction });
      return;
    }

    const playerLines = users.map((user, index) => {
      const medal = COPY.FEATURES.LEADERBOARD.MEDALS[index] ?? '';
      return `**${index + 1}.** <@${user.discord_id}> ${medal}`.trimEnd();
    });

    const pointLines = users.map(user => user.points);

    const embed = new EmbedBuilder()
      .setColor(CONFIG.COLORS.RED as ColorResolvable)
      .setTitle('Leaderboard')
      .addFields(
        { name: 'Player', value: playerLines.join('\n'), inline: true },
        { name: '\u200b', value: '\u200b', inline: true },
        { name: 'Points', value: `\`${pointLines.join('\n')}\``, inline: true },
      );

    await interaction.reply({ embeds: [embed] });
  },
};
