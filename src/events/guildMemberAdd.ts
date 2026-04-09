import { GuildMember } from 'discord.js';
import { log } from '@/helpers';
import { createUser } from '@/services/user';

export const onGuildMemberAdd = async (member: GuildMember) => {
  await createUser({
    discord_id: member.id,
    discord_username: member.user.username,
  });

  log({
    title: `Member Join: ${member.user.username} aka ${member.displayName}`,
    description: 'Member has joined the server.',
    thumbnail: member.displayAvatarURL(),
    footer: `Discord User ID: ${member.id}`,
  });
};
