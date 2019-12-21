interface TypeIsMobile {
  Android: () => boolean;
  BlackBerry: () => boolean;
  iOS: () => boolean;
  Opera: () => boolean;
  Windows: () => boolean;
  any: () => boolean;
};

const isMobile: TypeIsMobile = {
  Android: () => {
    return /Android/i.test(navigator.userAgent);
  },
  BlackBerry: () => {
    return /BlackBerry/i.test(navigator.userAgent);
  },
  iOS: () => {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
  },
  Opera: () => {
    return /Opera Mini/i.test(navigator.userAgent);
  },
  Windows: () => {
    return /IEMobile/i.test(navigator.userAgent) || /WPDesktop/i.test(navigator.userAgent);
  },
  any: () => {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};

export default isMobile;