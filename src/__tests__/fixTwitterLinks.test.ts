import { fixTwitterLinks } from '@/lib/utils/fixTwitterLinks';

describe('fixTwitterLinks', () => {
  it('fixes x.com status links', () =>
    expect(fixTwitterLinks('https://x.com/user/status/123')).toBe(
      'https://fixvx.com/user/status/123',
    ));
  it('fixes twitter.com status links', () =>
    expect(fixTwitterLinks('https://twitter.com/user/status/123')).toBe(
      'https://fixvx.com/user/status/123',
    ));
  it('fixes www and mobile subdomains', () =>
    expect(
      fixTwitterLinks(
        'https://www.x.com/a/status/1 https://mobile.twitter.com/b/status/2',
      ),
    ).toBe('https://fixvx.com/a/status/1 https://fixvx.com/b/status/2'));
  it('keeps surrounding text and query params', () =>
    expect(
      fixTwitterLinks('look at this https://x.com/user/status/123?s=20 lol'),
    ).toBe('look at this https://fixvx.com/user/status/123?s=20 lol'));
  it('ignores profile links', () =>
    expect(fixTwitterLinks('https://x.com/user')).toBeNull());
  it('ignores suppressed links', () =>
    expect(fixTwitterLinks('<https://x.com/user/status/123>')).toBeNull());
  it('ignores lookalike domains', () =>
    expect(fixTwitterLinks('https://notx.com/user/status/123')).toBeNull());
  it('returns null without links', () =>
    expect(fixTwitterLinks('hello world')).toBeNull());
});
