import NativejsSelect from 'index';
import {
  checkDefaultAndCustomSelect,
  checkCustomPlaceholder,
  checkCustomOptions,
  initWithOption,
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

  test('Mount default', () => initWithOption());

  test('Mount with option placeholder', () => initWithOption({ placeholder: 'Placholder' }));
  test('Mount with attribute option placeholder', () => initWithOption({ placeholder: 'Placholder' }, true));

  test('Mount with option fxiedPlaceholder', () => initWithOption({ fixedPlaceholder: 'Fixed placeholder:' }));
  //test('Mount with attribute option fxied-placeholder', () => initWithOption({ placeholder: 'Fixed placeholder:' }, true));

  describe('Handle', () => {
    test('Open custom select', () => {
      new NativejsSelect({ selector: '.defaultSelect' });
      const placeholderBtn = document.querySelector('.nativejs-select__placeholder') as HTMLElement;

      placeholderBtn.click();

      checkDefaultAndCustomSelect(true);
      checkCustomPlaceholder();
      checkCustomOptions();
    });
  });
});