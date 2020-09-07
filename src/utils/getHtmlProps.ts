import type { ObjString } from 'types';

export function getHtmlProps(select: HTMLSelectElement): ObjString {
  const props = {};

  Array.from(select.attributes)
    .filter(attr => attr.name.indexOf('data-') !== -1)
    .forEach(attr => {
      const optionName = attr.name
        .replace('data-', '')
        .split('-')
        .map((word, ind) => {
          if (ind !== 0) {
            return word.slice(0, 1).toUpperCase() + word.slice(1);
          }
          return word;
        })
        .join('');
      props[optionName] = attr.value;
    });

  return props;
}
