import { isMobile } from './utils';
import selectTemplate from 'templates/select.template';

export interface TNativejsSelectProps {
  selector: string;
  placeholder?: string;
  fixedPlaceholder?: string;
  disableMobile?: boolean;
  renderOptions?: (option: HTMLElement, index: number, length: number) => string;
  enableSearch?: boolean;
}

export default class NativejsSelect {
  selects: NodeListOf<HTMLSelectElement>;
  props: TNativejsSelectProps;

  constructor(props: TNativejsSelectProps) {
    if (props.disableMobile && isMobile.any()) {
      return;
    }
    this.props = props;
    this.selects = document.querySelectorAll(this.props.selector);
    this.renderCustomSelect();
    this.initHandlers();
  }

  private renderCustomSelect(): void {
    this.selects.forEach(select => {
      const hasCustomSelect = select.nextElementSibling?.classList?.contains('nativejs-select');
      hasCustomSelect && select.parentNode.removeChild(select.nextElementSibling);

      select.hidden = true;
      select.insertAdjacentHTML('afterend', selectTemplate(select, this.props));
    });
  }

  private initHandlers(): void {
    document.addEventListener('click', this.handleDocumentClick);

    this.selects.forEach(select => {
      const customSelect = select.nextElementSibling as HTMLDivElement;
      const placeholder = customSelect.querySelector('.nativejs-select__placeholder');
      const search = customSelect.querySelector('.nativejs-select__search-inp');
      const options = customSelect.querySelectorAll('.nativejs-select__option') as NodeListOf<
        HTMLButtonElement
      >;

      placeholder.addEventListener('click', this.handleToggleOpenSelect);
      search?.addEventListener('input', this.handleSearch(options, customSelect));
      options.forEach((option, ind) =>
        option.addEventListener('click', e => {
          this.handleChooseOption(e, select, options, ind);
        })
      );
    });
  }

  private handleDocumentClick = (e: Event): void => {
    const target = e.target as Element;
    const currentCustomSelect = target.closest('.nativejs-select');

    if (!currentCustomSelect) {
      Array.from(document.querySelectorAll('.nativejs-select')).forEach(select =>
        select.classList.remove('nativejs-select_active')
      );
    }
  };

  private handleToggleOpenSelect = (e: Event): void => {
    const ct = e.currentTarget as HTMLButtonElement;
    const currentCustomSelect = ct.closest('.nativejs-select');
    const searchInp = currentCustomSelect.querySelector('.nativejs-select__search-inp');

    // Toggle active select
    Array.from(document.querySelectorAll('.nativejs-select')).forEach(select => {
      if (select === currentCustomSelect) {
        select.classList.toggle('nativejs-select_active');
      } else {
        select.classList.remove('nativejs-select_active');
      }
    });

    // Add focus for search input if have
    if (currentCustomSelect.classList.contains('nativejs-select_active') && searchInp) {
      (searchInp as HTMLInputElement).focus();
    }
  };

  private handleSearch = (
    initOptions: NodeListOf<HTMLButtonElement>,
    customSelect: HTMLDivElement
  ): ((e: Event) => void) => {
    return (e: Event): void => {
      const optionsWrp = customSelect.querySelector('.nativejs-select__options');
      const searchVal = (e.target as HTMLInputElement).value.trim().toLocaleLowerCase();

      Array.from(optionsWrp.children).forEach(item => item.parentNode.removeChild(item));

      if (searchVal) {
        Array.from(initOptions).forEach(option => {
          const optionVal = option.textContent.trim().toLocaleLowerCase();

          if (optionVal.search(searchVal) !== -1) {
            optionsWrp.appendChild(option);
          }
        });
      } else {
        Array.from(initOptions).forEach(option => optionsWrp.appendChild(option));
      }
    };
  };

  private handleChooseOption(
    e: Event,
    select: HTMLSelectElement,
    initOptions: NodeListOf<HTMLButtonElement>,
    ind: number
  ): void {
    const ct = e.currentTarget as HTMLSelectElement;
    const customSelect = ct.closest('.nativejs-select');

    const searchInp = customSelect.querySelector('.nativejs-select__search-inp');
    const optionsWrp = customSelect.querySelector('.nativejs-select__options');
    const customOptions = Array.from(customSelect.querySelectorAll('.nativejs-select__option'));
    const customPlaceholderVal = customSelect.querySelector('.nativejs-select__placeholder-value');

    // Set selected option
    select.selectedIndex = ind;
    customOptions.forEach(option => option.removeAttribute('data-selected'));
    ct.setAttribute('data-selected', 'true');

    // Show selected option
    customSelect.classList.remove('nativejs-select_active');
    customPlaceholderVal.innerHTML = ct.innerHTML;

    // Set inited options for dropdown and reset search input if have
    Array.from(optionsWrp.children).forEach(item => item.parentNode.removeChild(item));
    Array.from(initOptions).forEach(option => optionsWrp.appendChild(option));
    searchInp && ((searchInp as HTMLInputElement).value = '');

    // Trigger change event
    select.dispatchEvent(new CustomEvent('change'));
  }
}
