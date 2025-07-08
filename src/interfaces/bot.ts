import { CommandInteraction } from 'discord.js';

export interface LogProps {
  title?: string;
  description: string;
  image?: string;
  authorIcon?: string;
  thumbnail?: string;
  footer?: string;
}

export interface ReplyProps {
  content: string;
  ephemeral: boolean;
  interaction: CommandInteraction;
}
