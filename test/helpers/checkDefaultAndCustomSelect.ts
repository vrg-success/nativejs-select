import '@testing-library/jest-dom/extend-expect';


export function checkDefaultAndCustomSelect(
  isOpen: boolean = false
): void {
  const defaultSelect = document.querySelector('.defaultSelect');
  const customSelect = document.querySelector('.nativejs-select');

  expect(defaultSelect).not.toBeVisible();
  expect(customSelect.children).toHaveLength(2);

  if (isOpen) {
    expect(customSelect.classList).toHaveLength(2);
    expect(customSelect).toHaveClass('nativejs-select')
    expect(customSelect).toHaveClass('nativejs-select_active');
  } else {
    expect(customSelect.classList).toHaveLength(1);
    expect(customSelect).toHaveClass('nativejs-select');
  }
}