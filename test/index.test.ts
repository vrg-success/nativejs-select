import NativejsSelect from 'index';
import {
  checkDefaultAndCustomSelect,
  checkCustomPlaceholder,
  checkCustomOptions,
  initWithOption,
  toggleShowCustomOptions,
} from './helpers';


describe('Custom select', () => {
  beforeEach(() => document.body.insertAdjacentHTML('beforeend', `
    <select class="defaultSelect">
      <option value="react" data-icon="img/react.png">React</option>
      <option value="vue" data-icon="img/vue.png">Vue</option>
      <option value="svelte" data-icon="img/svelte.png">Svelte</option>
    </select>
  `));

  afterEach(() => document.body.innerHTML = '');

  test('Render default', () => initWithOption() );
  test('Render with option placeholder', () => initWithOption({ placeholder: 'Placholder' }) );
  test('Render with attribute option placeholder', () => initWithOption({ placeholder: 'Placholder' }, true) );
  test('Render with option fxiedPlaceholder', () => initWithOption({ fixedPlaceholder: 'Fixed placeholder:' }) );
  test('Render with attribute option fxied-placeholder', () => initWithOption({ fixedPlaceholder: 'Fixed placeholder:' }, true) );

  test('Render custom options', () => {
    initWithOption({ 
      renderOptions: (option, index, length) => {
        const icon = option.getAttribute('data-icon');
    
        return `
          ${icon ? `<img src="${icon}" alt="icon" style="width: 20px;" />` : ''}
          ${option.textContent}
        `;
      }
    })
  });

  test('Handle toggle show custom options', () => {
    new NativejsSelect({ selector: '.defaultSelect' });
    const placeholderBtn = document.querySelector('.nativejs-select__placeholder') as HTMLElement;

    placeholderBtn.click();
    toggleShowCustomOptions(true);
    
    placeholderBtn.click();
    toggleShowCustomOptions(false);
  });
});