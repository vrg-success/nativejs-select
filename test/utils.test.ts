import { isMobile, getHtmlProps } from 'utils';

describe('Utils', () => {
  it('isMobile', () => {
    expect(isMobile.any()).toBe(false);

    (window.navigator as any).__defineGetter__(
      'userAgent',
      () =>
        'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Mobile Safari/537.36'
    );

    expect(isMobile.any()).toBe(true);
  });

  it('getHtmlProps', () => {
    document.body.innerHTML = `
      <select 
        class="select" 
        data-placeholder="placeholder"
        data-fixed-placeholder="fixedPlaceholder"
        data-disable-mobile="disableMobile"
        data-enable-search="enableSearch"
      ></select>
    `;
    const select = document.querySelector('select');

    expect(getHtmlProps(select)).toMatchObject({
      placeholder: 'placeholder',
      fixedPlaceholder: 'fixedPlaceholder',
      disableMobile: 'disableMobile',
      enableSearch: 'enableSearch',
    });

    document.body.innerHTML = '';
  });
});
