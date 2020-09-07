import { getHtmlProps } from 'utils';
import type { TNativejsSelectProps } from 'index';

export default function selectTemplate(
  select: HTMLSelectElement,
  props?: TNativejsSelectProps
): string {
  const parsedProps = { ...props, ...getHtmlProps(select) };
  const { placeholder, fixedPlaceholder, renderOptions, enableSearch } = parsedProps;

  const options = Array.from(select.querySelectorAll('option'));
  const selectedOption = options.filter(option => option.selected)[0] as HTMLOptionElement;

  function renderPlaceholderVal(): string {
    if (placeholder) return placeholder;
    if (renderOptions) {
      return renderOptions(selectedOption, selectedOption.index, options.length);
    }
    return selectedOption.innerHTML;
  }

  // prettier-ignore
  return `
    <div class="nativejs-select">
      <button type="button" class="nativejs-select__placeholder">
        ${fixedPlaceholder ? `<span class="nativejs-select__placeholder-fixed">${fixedPlaceholder}</span>` : ''}
        <div class="nativejs-select__placeholder-value">
          ${renderPlaceholderVal()}
        </div>
      </button>

      <div class="nativejs-select__dropdown">
        ${enableSearch ? `
          <div class="nativejs-select__search">
            <input  type="text" class="nativejs-select__search-inp" />
          </div>
        ` : ''}
        <div class="nativejs-select__options">
          ${options.map((option, ind) => `
            <button type="button" data-selected="${option.selected}" class="nativejs-select__option">
              ${renderOptions ? 
                  renderOptions(option, ind, options.length) : 
                  option.innerHTML}
            </button>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}
