import { GuildMember } from 'discord.js';
import { log } from '@/helpers';

export const onGuildMemberAdd = async (member: GuildMember) => {
  log({
    title: `Member Join: ${member.user.username} aka ${member.displayName}`,
    description: 'Member has joined the server.',
    thumbnail: member.displayAvatarURL() || undefined,
    footer: `Discord User ID: ${member.id}`,
  });
};
