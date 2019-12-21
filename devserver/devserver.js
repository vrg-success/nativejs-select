new NativejsSelect({
  selector: '.customSelect',
  disableMobile: true,
  renderOptions: (option, index, length) => {
    const icon = option.getAttribute('data-icon');

    return `
      ${icon ? `<img src="${icon}" alt="icon" style="width: 20px;" />` : ''}
      ${option.textContent}
    `;
  }
});