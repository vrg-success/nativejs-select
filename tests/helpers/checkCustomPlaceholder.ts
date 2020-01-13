import '@testing-library/jest-dom/extend-expect';


export default function checkCustomPlaceholder(
  placeholder?: string,
  fixedPlaceholder?: string,
): void {
  const customSelect = document.querySelector('.nativejs-select');
  const customPlaceholder = customSelect.children[0];

  expect(customPlaceholder.tagName).toBe('BUTTON');
  expect(customPlaceholder).toHaveClass('nativejs-select__placeholder');

  if (placeholder) {
    expect(customPlaceholder).toHaveTextContent(placeholder);
  } 
  else if (fixedPlaceholder)  {
    
  } 
  else {
    const defaultSelect = document.querySelector('.customSelect') as HTMLSelectElement;
    const defaultPlaceholder = defaultSelect.children[defaultSelect.selectedIndex].textContent;

    expect(customPlaceholder).toHaveTextContent(defaultPlaceholder);
  }
}