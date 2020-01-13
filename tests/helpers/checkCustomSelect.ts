import '@testing-library/jest-dom/extend-expect';


export default function checkCustomSelect(): void {
  const defaultSelect = document.querySelector('.customSelect');
  const customSelect = document.querySelector('.nativejs-select');

  expect(defaultSelect).not.toBeVisible();
  expect(customSelect).toHaveClass('nativejs-select');
  expect(customSelect.children.length).toBe(2);
}