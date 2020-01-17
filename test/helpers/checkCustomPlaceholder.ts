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

  switch (optionKey) {
    case 'placeholder':
      expect(customPlaceholder.textContent.trim()).toBe(optionVal);
      break;

    case 'fixedPlaceholder':
      const fixedPlaceholder = customPlaceholder.children[0];
      const childNodes = customPlaceholder.childNodes;
      const lastValFromPlaceholder = childNodes[childNodes.length - 1].nodeValue.trim();

      expect(customPlaceholder.children).toHaveLength(1);
      expect(lastValFromPlaceholder).toBe( _getDefaultPlaceholder());

      expect(fixedPlaceholder).toHaveClass('nativejs-select__placeholder_fixed');
      expect(fixedPlaceholder).toHaveTextContent(optionVal);
      break;

    default:
      expect(customPlaceholder).toHaveTextContent( _getDefaultPlaceholder() );
  }
}


function _getDefaultPlaceholder(): string {
  const defaultSelect = document.querySelector('.defaultSelect') as HTMLSelectElement;
  const defaultPlaceholder = defaultSelect.children[defaultSelect.selectedIndex].textContent;

  return defaultPlaceholder;
}