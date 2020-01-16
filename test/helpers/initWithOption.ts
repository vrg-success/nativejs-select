import NativejsSelect, { TypeProps, TypePropsWithoutSelector } from 'index';
import {
  checkDefaultAndCustomSelect,
  checkCustomPlaceholder,
  checkCustomOptions,
} from './';


export function initWithOption(
  option: TypePropsWithoutSelector = {}, isAttr: boolean = false
): void {
  const optionKey: string = Object.keys(option)[0];
  const optionVal: any = option[optionKey];
  let props: TypeProps = {
    selector: '.defaultSelect',
  };

  if (optionKey) {
    if (isAttr) {
      document
        .querySelector('.defaultSelect')
        .setAttribute(`data-${optionKey}`, optionVal);
    } else {
      props[optionKey] = optionVal;
    }
  }

  new NativejsSelect(props);

  checkDefaultAndCustomSelect();
  checkCustomOptions();

  checkCustomPlaceholder(option);
}