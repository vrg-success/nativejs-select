import '@testing-library/jest-dom/extend-expect';


export default function checkCustomOptions(): void {
  const defaultSelect = document.querySelector('.customSelect');
  const customSelect = document.querySelector('.nativejs-select');

  // Options
  const customOptions = customSelect.children[1];
  expect(customOptions.tagName).toBe('UL');
  expect(customOptions).toHaveClass('nativejs-select__options');
  // Option
  Array.from( customSelect.children[1].children ).forEach((option, ind) => {
    expect(option.tagName).toBe('LI');
    expect(option).toHaveClass('nativejs-select__option');
    expect(option.children.length).toBe(1);
    // Option button
    const btn = option.children[0];
    expect(btn.tagName).toBe('BUTTON');
    expect(btn).toHaveClass('nativejs-select__option_btn');
  });
}