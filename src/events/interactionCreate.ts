import { ChatInputCommandInteraction, Interaction } from 'discord.js';
import { handleCommandInteraction } from '@/helpers';

export const onInteractionCreate = async (interaction: Interaction) => {
  if (interaction.isChatInputCommand()) {
    await handleCommandInteraction(interaction as ChatInputCommandInteraction);
  }
};
