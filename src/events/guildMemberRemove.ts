import { deleteBirthday } from '@/services/birthday';
import { GuildMember, PartialGuildMember } from 'discord.js';

export const onGuildMemberRemove = async (
  member: GuildMember | PartialGuildMember
) => {
  await deleteBirthday(member.id);
};
