import { TypePropsWithoutSelector } from 'index';
import '@testing-library/jest-dom/extend-expect';


export function checkCustomOptions(
  option: TypePropsWithoutSelector = {}
): void {
  const optionKey: string = Object.keys(option)[0];
  const optionVal: any = option[optionKey];
  const customSelect = document.querySelector('.nativejs-select');

  // Options
  const customOptions = customSelect.children[1];
  expect(customOptions).toHaveClass('nativejs-select__options');
  // Option
  Array.from( customSelect.children[1].children ).forEach((option, ind) => {
    expect(option).toHaveClass('nativejs-select__option');
    expect(option.children.length).toBe(1);
    // Option button
    const btn = option.children[0];
    expect(btn).toHaveClass('nativejs-select__option_btn');

    if (optionKey === 'renderOptions') {
      //console.log(optionVal());
    }
  });
}