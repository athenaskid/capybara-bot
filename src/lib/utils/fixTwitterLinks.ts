import { CONFIG } from '@/constants';

// Matches x.com / twitter.com status links, skipping ones wrapped in <> (embed suppressed)
const TWITTER_LINK_REGEX = /(?<!<)https?:\/\/(?:www\.|mobile\.)?(?:x|twitter)\.com\/(?=\w+\/status\/\d+)/gi;

export const fixTwitterLinks = (content: string): string | null => {
  const fixed = content.replace(TWITTER_LINK_REGEX, `https://${CONFIG.FEATURES.LINK_FIXER.DOMAIN}/`);

  return fixed === content ? null : fixed;
};
