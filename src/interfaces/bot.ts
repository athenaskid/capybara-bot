import { CommandInteraction } from 'discord.js';

export interface ReplyProps {
  content: string;
  ephimeral: boolean;
  interaction: CommandInteraction;
}
