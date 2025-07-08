import { GuildMember, PartialGuildMember } from 'discord.js';

import { log } from '@/helpers';
import { deleteBirthday } from '@/services/birthday';

export const onGuildMemberRemove = async (
  member: GuildMember | PartialGuildMember
) => {
  await deleteBirthday(member.id);

  log({
    title: `Member Leave: ${member.user.username} aka ${member.displayName}`,
    description: 'Member has left or has been kicked from the server.',
    thumbnail: member.displayAvatarURL() || undefined,
    footer: `Discord User ID: ${member.id}`,
  });
};
