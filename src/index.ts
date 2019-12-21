import isMobile from './utils/isMobile';


interface TypeProps {
  selector: string;
  placeholder?: string;
  fixedPlaceholder?: string;
  disableMobile?: boolean;
  renderOptions?: (option: HTMLElement, index: number, length: number) => string;
};

export default class NativejsSelect {
  constructor(private props: TypeProps) {
    if (props.disableMobile && isMobile.any()) return;
    this.renderCustomSelect();
  }

  private renderCustomSelect(): void {
    const { selector, } = this.props;

    document
      .querySelectorAll(selector)
      .forEach(select => {
        const nativeSelect = select as HTMLSelectElement;
        const customOptions = this.getCustomOptions(nativeSelect);
        const customPlaceholder = this.getCustomPlaceholder(nativeSelect, customOptions);

        nativeSelect.hidden = true;

        select.insertAdjacentHTML('afterend', `
          <div class="nativejs-select">
            ${customPlaceholder}
            ${customOptions}
          </div>
        `);

        this.addHandlers(nativeSelect);
      });
  }

  private getCustomOptions(select: HTMLSelectElement): string {
    const { renderOptions, } = this.props;
    const options = Array.from( select.querySelectorAll('option') );
    const optionsLength = options.length;

    const customOptions = options.map((option, ind) => {
      return (
        `<li 
          class="nativejs-select__option"
          ${option.selected ? 'data-selected="true"' : ''}
        >
          <button class="nativejs-select__option_btn">
            ${renderOptions ? renderOptions(option, ind, optionsLength) : option.innerHTML}
          </button>
        </li>`
      );
    });

    return `<ul class="nativejs-select__options">${customOptions.join('')}</ul>`;
  }

  private getCustomPlaceholder(select: HTMLSelectElement, customOptions: string): string {
    const { 
      placeholder,
      fixedPlaceholder,
    } = this.props;
    const fixedplaceholderText = select.getAttribute('data-fixed-placeholder') || fixedPlaceholder;
    const placeholderText = select.getAttribute('data-placeholder') || placeholder;
    let placeholderContent = '';

    if (!placeholderText) {
      const wrpCustomOptions = document.createElement('div');
      wrpCustomOptions.innerHTML = customOptions;

      placeholderContent = wrpCustomOptions.querySelector('.nativejs-select__option[data-selected="true"] .nativejs-select__option_btn').innerHTML;
    } else {
      placeholderContent = placeholderText;
    }

    return `
      <button class="nativejs-select__placeholder">
        ${fixedplaceholderText ? `<span class="nativejs-select__placeholder_fixed">${fixedplaceholderText}</span>` : ''}
        ${placeholderContent}
      </button>
    `;
  }

  private addHandlers(select: HTMLSelectElement): void {
    const customSelect = select.nextElementSibling;

    customSelect.querySelector('.nativejs-select__placeholder').addEventListener('click', this.handleToggleOpenSelect);
    customSelect.querySelectorAll('.nativejs-select__option_btn').forEach(option => {
      option.addEventListener('click', (e) => {
        this.handleChooseOption(e, select as HTMLSelectElement);
      });
    });
    document.addEventListener('click', this.handleDocumentClick);
  }

  private handleToggleOpenSelect = (e): void => {
    e.currentTarget.parentNode.classList.toggle('nativejs-select_active');
  }

  private handleChooseOption(e, select: HTMLSelectElement): void {
    const ct = e.currentTarget;
    const customSelect = select.nextElementSibling;
    const customOptions = Array.from( customSelect.querySelectorAll('.nativejs-select__option') );
    const customPlaceholder = customSelect.querySelector('.nativejs-select__placeholder');
    const fixedPlaceholder = customPlaceholder.querySelector('.nativejs-select__placeholder_fixed');

    // Remove selecterd attr
    customOptions.forEach(option => {
      option.removeAttribute('data-selected');
    });

    // Add selected attr to current el
    ct.parentNode.setAttribute('data-selected', 'true');

    // Change custom placeholder html
    customPlaceholder.innerHTML = `
      ${fixedPlaceholder ? fixedPlaceholder.outerHTML : ''}
      ${ct.innerHTML}
    `;

    // Change native select value
    select.selectedIndex = customOptions.indexOf(ct.parentNode);
  }

  private handleDocumentClick = (e): void => {
    const currentCustomPlaceholder = e.target.closest('.nativejs-select__placeholder');

    document.querySelectorAll('.nativejs-select').forEach(customSelect => {
      const customSelectPlaceholder = customSelect.querySelector('.nativejs-select__placeholder');

      if (!currentCustomPlaceholder && currentCustomPlaceholder !== customSelectPlaceholder) {
        customSelect.classList.remove('nativejs-select_active');
      }
    });
  }
}