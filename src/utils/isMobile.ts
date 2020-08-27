type TIsMobile = {
  Android(): boolean;
  BlackBerry(): boolean;
  iOS(): boolean;
  Opera(): boolean;
  Windows(): boolean;
  any(): boolean;
};

export const isMobile: TIsMobile = {
  Android: () => /Android/i.test(navigator.userAgent),
  BlackBerry: () => /BlackBerry/i.test(navigator.userAgent),
  iOS: () => /iPhone|iPad|iPod/i.test(navigator.userAgent),
  Opera: () => /Opera Mini/i.test(navigator.userAgent),
  Windows: () => /IEMobile/i.test(navigator.userAgent) || /WPDesktop/i.test(navigator.userAgent),
  any: () =>
    isMobile.Android() ||
    isMobile.BlackBerry() ||
    isMobile.iOS() ||
    isMobile.Opera() ||
    isMobile.Windows(),
};
