import NativejsSelect from 'index';

describe('Custom select', () => {
  beforeEach(() => {
    document.body.insertAdjacentHTML(
      'beforeend',
      `
    <select class="defaultSelect">
      <option value="react" data-icon="img/react.png">React</option>
      <option value="vue" data-icon="img/vue.png">Vue</option>
      <option value="svelte" data-icon="img/svelte.png">Svelte</option>
    </select>
  `
    );
  });

  afterEach(() => (document.body.innerHTML = ''));

  test('Render default', () => {
    new NativejsSelect({ selector: '.defaultSelect' });

    expect(document.querySelector('.nativejs-select').outerHTML).toMatchSnapshot();
  });

  test('Render with placeholder', () => {
    new NativejsSelect({
      selector: '.defaultSelect',
      placeholder: 'Placholder',
    });

    expect(document.querySelector('.nativejs-select').outerHTML).toMatchSnapshot();
  });

  test('Render with fixed placeholder', () => {
    new NativejsSelect({
      selector: '.defaultSelect',
      fixedPlaceholder: 'fixed: placeholder',
    });

    expect(document.querySelector('.nativejs-select').outerHTML).toMatchSnapshot();
  });

  test('Render with fixedPlaceholder and placeholder', () => {
    new NativejsSelect({
      selector: '.defaultSelect',
      placeholder: 'Placholder',
      fixedPlaceholder: 'fixed: placeholder',
    });

    expect(document.querySelector('.nativejs-select').outerHTML).toMatchSnapshot();
  });

  test('Render with custom options', () => {
    new NativejsSelect({
      selector: '.defaultSelect',
      renderOptions: option => {
        const icon = option.getAttribute('data-icon');

        return `
          ${icon ? `<img src="${icon}" alt="icon" style="width: 20px;" />` : ''}
          ${option.textContent}
        `;
      },
    });
    expect(document.querySelector('.nativejs-select').outerHTML).toMatchSnapshot();
  });

  test('Render with all ui options', () => {
    new NativejsSelect({
      selector: '.defaultSelect',
      fixedPlaceholder: 'fixed: placeholder',
      placeholder: 'Placholder',
      renderOptions: option => {
        const icon = option.getAttribute('data-icon');

        return `
          ${icon ? `<img src="${icon}" alt="icon" style="width: 20px;" />` : ''}
          ${option.textContent}
        `;
      },
    });

    expect(document.querySelector('.nativejs-select').outerHTML).toMatchSnapshot();
  });

  test('Render with disableMobile option', () => {
    new NativejsSelect({ selector: '.defaultSelect', disableMobile: true });
    expect(document.querySelectorAll('.nativejs-select').length).toBe(1);

    // Mock mobile device
    (navigator as any).__defineGetter__(
      'userAgent',
      () =>
        'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Mobile Safari/537.36'
    );
    // Remove previos custom select
    const customSelect = document.querySelector('.nativejs-select');
    customSelect.parentNode.removeChild(customSelect);
    // Check
    new NativejsSelect({ selector: '.defaultSelect', disableMobile: true });
    expect(document.querySelectorAll('.nativejs-select').length).toBe(0);
  });

  test('Handle toggle open', () => {
    new NativejsSelect({ selector: '.defaultSelect' });

    const customSelect = document.querySelector('.nativejs-select');
    const placeholderBtn = document.querySelector('.nativejs-select__placeholder') as HTMLElement;
    const dropdownOption = document.querySelector('.nativejs-select__option_btn') as HTMLElement;

    // Open after placeholderBtn click
    placeholderBtn.click();
    expect(customSelect.classList.contains('nativejs-select_active')).toBe(true);

    // Close after placeholderBtn click
    placeholderBtn.click();
    expect(customSelect.classList.contains('nativejs-select_active')).toBe(false);

    // Close after body click
    customSelect.classList.add('nativejs-select_active');
    document.body.click();
    expect(customSelect.classList.contains('nativejs-select_active')).toBe(false);

    // Close after option click
    customSelect.classList.add('nativejs-select_active');
    dropdownOption.click();
    expect(customSelect.classList.contains('nativejs-select_active')).toBe(false);
  });

  test('Handle choose option', () => {
    new NativejsSelect({ selector: '.defaultSelect' });

    const select = document.querySelector('.defaultSelect') as HTMLSelectElement;
    const placeholderBtn = document.querySelector('.nativejs-select__placeholder') as HTMLElement;
    const dropdownOptions = document.querySelectorAll('.nativejs-select__option_btn') as NodeList;

    dropdownOptions.forEach((option: HTMLElement, ind) => {
      option.click();

      expect(select.selectedIndex).toBe(ind);

      // Check data attribute
      expect(document.querySelectorAll('[data-selected]').length).toBe(1);
      expect((option.parentNode as HTMLElement).getAttribute('data-selected')).toBe('true');

      // Check html of placehoder
      expect(placeholderBtn.innerHTML.trim()).toBe(option.innerHTML.trim());
    });
  });

  test('Check for custom select buttons not trigger submit form', () => {
    new NativejsSelect({ selector: '.defaultSelect' });

    const customSelect = document.querySelector('.nativejs-select');
    const selectButtons = customSelect?.querySelectorAll('button');

    selectButtons.forEach(btn => {
      expect(btn.getAttribute('type')).toBe('button');
    });
  });
});
