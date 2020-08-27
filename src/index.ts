import { isMobile } from './utils';
import selectTemplate from 'templates/select.template';

export interface TNativejsSelectProps {
  selector: string;
  placeholder?: string;
  fixedPlaceholder?: string;
  disableMobile?: boolean;
  renderOptions?: (option: HTMLElement, index: number, length: number) => string;
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
      const customSelect = select.nextElementSibling;
      const placeholder = customSelect.querySelector('.nativejs-select__placeholder');
      const options = customSelect.querySelectorAll('.nativejs-select__option');

      placeholder.addEventListener('click', this.handleToggleOpenSelect);
      options.forEach((option, ind) =>
        option.addEventListener('click', e => {
          this.handleChooseOption(e, select, ind);
        })
      );
    });
  }

  private handleDocumentClick = (e: Event): void => {
    const clickedPlaceholder = (e.target as Element).closest('.nativejs-select__placeholder');

    document.querySelectorAll('.nativejs-select').forEach(select => {
      const placeholder = select.querySelector('.nativejs-select__placeholder');

      if (!clickedPlaceholder || clickedPlaceholder !== placeholder) {
        select.classList.remove('nativejs-select_active');
      }
    });
  };

  private handleToggleOpenSelect = (e): void =>
    e.currentTarget.parentNode.classList.toggle('nativejs-select_active');

  private handleChooseOption(e: Event, select: HTMLSelectElement, ind: number): void {
    const ct = e.currentTarget as HTMLSelectElement;
    const customSelect = select.nextElementSibling;
    const customOptions = Array.from(customSelect.querySelectorAll('.nativejs-select__option'));
    const customPlaceholderVal = customSelect.querySelector('.nativejs-select__placeholder-value');

    select.selectedIndex = ind;

    customOptions.forEach(option => option.removeAttribute('data-selected'));
    ct.setAttribute('data-selected', 'true');

    customPlaceholderVal.innerHTML = ct.innerHTML;
  }
}
