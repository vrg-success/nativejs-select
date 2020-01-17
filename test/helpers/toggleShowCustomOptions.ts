import {
  checkDefaultAndCustomSelect,
  checkCustomPlaceholder,
  checkCustomOptions,
} from './';


export function toggleShowCustomOptions(isOpen: boolean): void {
  checkDefaultAndCustomSelect(isOpen);
  checkCustomPlaceholder();
  checkCustomOptions();
}