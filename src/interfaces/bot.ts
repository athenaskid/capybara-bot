import { CommandInteraction } from 'discord.js';

export interface ReplyProps {
  content: string;
  ephemeral: boolean;
  interaction: CommandInteraction;
}
