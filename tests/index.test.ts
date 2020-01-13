import NativejsSelect from '../src/';
import checkCustomSelect from './helpers/checkCustomSelect';
import checkCustomPlaceholder from './helpers/checkCustomPlaceholder';
import checkCustomOptions from './helpers/checkCustomOptions';


describe('Custom select', () => {
  beforeEach(() => document.body.insertAdjacentHTML('beforeend', `
    <select class="customSelect">
      <option value="react" data-icon="img/react.png">React</option>
      <option value="vue" data-icon="img/vue.png">Vue</option>
      <option value="svelte" data-icon="img/svelte.png">Svelte</option>
    </select>
  `));
  
  afterEach(() => document.body.innerHTML = '');

  test('Default mount', () => {
    new NativejsSelect({ selector: '.customSelect' });

    checkCustomSelect();
    checkCustomPlaceholder();
    checkCustomOptions();
  });

  test('Mount with attribute placeholder', () => {
    document
      .querySelector('.customSelect')
      .setAttribute('data-placeholder', 'Placeholder');
    new NativejsSelect({ selector: '.customSelect' });

    checkCustomSelect();
    checkCustomPlaceholder('Placeholder');
    checkCustomOptions();
  });

  test('Mount with option placeholder', () => {
    new NativejsSelect({ 
      selector: '.customSelect', 
      placeholder: 'Placeholder' 
    });

    checkCustomSelect();
    checkCustomPlaceholder('Placeholder');
    checkCustomOptions();
  });
});