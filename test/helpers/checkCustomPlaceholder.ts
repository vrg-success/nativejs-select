import { TypePropsWithoutSelector } from 'index';
import '@testing-library/jest-dom/extend-expect';


export function checkCustomPlaceholder(
  option: TypePropsWithoutSelector = {}
): void {
  const optionKey: string = Object.keys(option)[0];
  const optionVal: any = option[optionKey];

  const defaultSelect = document.querySelector('.nativejs-select');
  const customPlaceholder = defaultSelect.children[0];

  expect(customPlaceholder).toHaveClass('nativejs-select__placeholder');

  if (optionKey === 'placeholder') {
    expect(customPlaceholder.textContent.trim()).toBe(optionVal);
  } 
  else if (optionKey == 'fixedPlaceholder')  {
    expect(customPlaceholder.children).toHaveLength(1);

    const fixedPlaceholder = customPlaceholder.children[0];
    expect(fixedPlaceholder.tagName).toBe('SPAN');
    expect(fixedPlaceholder).toHaveClass('nativejs-select__placeholder_fixed');
  } 
  else {
    const defaultSelect = document.querySelector('.defaultSelect') as HTMLSelectElement;
    const defaultPlaceholder = defaultSelect.children[defaultSelect.selectedIndex].textContent;

    expect(customPlaceholder).toHaveTextContent(defaultPlaceholder);
  }
}