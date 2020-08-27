new NativejsSelect({
  selector: '.defaultSelect',
  disableMobile: true,
  renderOptions: function renderOptions(option, index, length) {
    var icon = option.getAttribute('data-icon');
    return (
      (icon ? '<img src="' + icon + '" alt="icon" style="width: 20px;" />' : '') +
      option.textContent
    );
  },
});
