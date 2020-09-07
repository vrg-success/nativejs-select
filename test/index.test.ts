import NativejsSelect from 'index';

const insertSelect = (): void =>
  document.body.insertAdjacentHTML(
    'beforeend',
    `<select class="defaultSelect">
      <option value="react" data-icon="img/react.png">React</option>
      <option value="vue" data-icon="img/vue.png">Vue</option>
      <option value="svelte" data-icon="img/svelte.png">Svelte</option>
    </select>`
  );

describe('Custom select', () => {
  beforeEach(() => insertSelect());
  afterEach(() => (document.body.innerHTML = ''));

  it('Render default', () => {
    new NativejsSelect({ selector: '.defaultSelect' });

    expect(document.querySelector('.nativejs-select').outerHTML).toMatchSnapshot();
  });

  it('Render with placeholder', () => {
    new NativejsSelect({
      selector: '.defaultSelect',
      placeholder: 'Placholder',
    });

    expect(document.querySelector('.nativejs-select').outerHTML).toMatchSnapshot();
  });

  it('Render with fixed placeholder', () => {
    new NativejsSelect({
      selector: '.defaultSelect',
      fixedPlaceholder: 'fixed: placeholder',
    });

    expect(document.querySelector('.nativejs-select').outerHTML).toMatchSnapshot();
  });

  it('Render with fixedPlaceholder and placeholder', () => {
    new NativejsSelect({
      selector: '.defaultSelect',
      placeholder: 'Placholder',
      fixedPlaceholder: 'fixed: placeholder',
    });

    expect(document.querySelector('.nativejs-select').outerHTML).toMatchSnapshot();
  });

  it('Render with custom options', () => {
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

  it('Render with search', () => {
    new NativejsSelect({
      selector: '.defaultSelect',
      enableSearch: true,
    });
    expect(document.querySelector('.nativejs-select').outerHTML).toMatchSnapshot();
  });

  it('Render with all ui options', () => {
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
      enableSearch: true,
    });

    expect(document.querySelector('.nativejs-select').outerHTML).toMatchSnapshot();
  });

  it('Render with disableMobile', () => {
    new NativejsSelect({ selector: '.defaultSelect', disableMobile: false });
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

  it('Handle toggle open', () => {
    insertSelect(); // Insert second select
    new NativejsSelect({ selector: '.defaultSelect' });

    const customSelects = document.querySelectorAll('.nativejs-select');
    const placeholderBtn = customSelects[0].querySelector(
      '.nativejs-select__placeholder'
    ) as HTMLElement;
    const dropdownOption = customSelects[0].querySelector(
      '.nativejs-select__option'
    ) as HTMLElement;

    // Toggle open dropdown after placeholderBtn click
    customSelects[1].classList.add('nativejs-select_active');

    placeholderBtn.click();
    expect(customSelects[0].classList.contains('nativejs-select_active')).toBe(true);
    expect(customSelects[1].classList.contains('nativejs-select_active')).toBe(false);

    placeholderBtn.click();
    expect(customSelects[0].classList.contains('nativejs-select_active')).toBe(false);

    // Close after body click
    customSelects[0].classList.add('nativejs-select_active');
    document.body.click();
    expect(customSelects[0].classList.contains('nativejs-select_active')).toBe(false);

    // Close after option click
    customSelects[0].classList.add('nativejs-select_active');
    dropdownOption.click();
    expect(customSelects[0].classList.contains('nativejs-select_active')).toBe(false);
  });

  it('Handle choose option', () => {
    new NativejsSelect({ selector: '.defaultSelect' });

    const select = document.querySelector('.defaultSelect') as HTMLSelectElement;
    const placeholderVal = document.querySelector(
      '.nativejs-select__placeholder-value'
    ) as HTMLDivElement;
    const dropdownOptions = document.querySelectorAll('.nativejs-select__option') as NodeListOf<
      HTMLButtonElement
    >;

    dropdownOptions.forEach((option, ind) => {
      option.click();

      expect(select.selectedIndex).toBe(ind);

      // Check data attribute
      expect(document.querySelectorAll('[data-selected]').length).toBe(1);
      expect(option.getAttribute('data-selected')).toBe('true');

      // Check html of placehoder
      expect(placeholderVal.innerHTML).toBe(option.innerHTML);
    });
  });

  it('Check for buttons not trigger submit form', () => {
    new NativejsSelect({ selector: '.defaultSelect' });

    const customSelect = document.querySelector('.nativejs-select');
    const selectButtons = customSelect.querySelectorAll('button');

    selectButtons.forEach(btn => {
      expect(btn.getAttribute('type')).toBe('button');
    });
  });

  it('Schould trigger change event to defaultSelect', () => {
    new NativejsSelect({ selector: '.defaultSelect' });

    const defaultSelect = document.querySelector('.defaultSelect');
    const changeObserver = jest.fn();

    defaultSelect.addEventListener('change', changeObserver);
    (document.querySelector('.nativejs-select__option') as HTMLButtonElement).click();

    expect(changeObserver).toBeCalled();
  });

  describe('Schould correct work search', () => {
    insertSelect();
    new NativejsSelect({ selector: '.defaultSelect', enableSearch: true });

    const customSelect = document.querySelector('.nativejs-select');
    const searchInp = customSelect.querySelector(
      '.nativejs-select__search-inp'
    ) as HTMLInputElement;
    const initOptions = customSelect.querySelector('.nativejs-select__options');

    ['react', 'vue', 'svelte'].forEach(word => {
      it(`Search query "${word}"`, () => {
        searchInp.value = word;
        searchInp.dispatchEvent(new Event('input'));

        Array.from(customSelect.querySelectorAll('.nativejs-select__option')).forEach(option => {
          const optionVal = option.textContent.trim().toLowerCase();
          expect(optionVal.indexOf(word) !== -1).toBe(true);
        });
      });
    });

    it(`If value set empty`, () => {
      searchInp.value = '';
      searchInp.dispatchEvent(new Event('input'));

      const optionsAfterSearch = customSelect.querySelector('.nativejs-select__options');
      expect(initOptions.innerHTML === optionsAfterSearch.innerHTML).toBe(true);
    });

    it(`Should reset options after clicked on found option`, () => {
      searchInp.value = 'react';
      searchInp.dispatchEvent(new Event('input'));

      (customSelect.querySelector('.nativejs-select__option') as HTMLButtonElement).click();

      const optionsAfterSearch = customSelect.querySelector('.nativejs-select__options');
      expect(initOptions.innerHTML === optionsAfterSearch.innerHTML).toBe(true);
    });
  });
});
