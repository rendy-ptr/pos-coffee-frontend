const CARD_STYLES = 'border border-[#e6d9c9] bg-white';
const TEXT_COLORS = {
  primary: 'text-[#6f4e37]',
  secondary: 'text-[#8c7158]',
  bold: 'font-bold text-[#6f4e37]',
};
const BUTTON_STYLES =
  'rounded-md bg-[#8b5e3c] text-white shadow transition-colors duration-200 hover:bg-[#a66a4c] focus:ring-2 focus:ring-[#d2bba3] focus:outline-none';

const SHADOW_CARD_STYLE =
  'shadow-lg transition-shadow duration-300 hover:shadow-xl';

const CHILDREN_SHADOW_CARD_STYLE =
  'shadow-sm transition-shadow duration-200 hover:shadow-md';

const COLOR = {
  TEXT_PRIMARY: 'font-bold text-[#6f4e37]',
  TEXT_SECONDARY: 'font-medium text-[#8c7158]',
  BG_ICON: 'bg-gradient-to-br from-[#6f4e37] to-[#8c7158]',
  BUTTON_HOVER_ICON:
    'group rounded-lg border-0 bg-gradient-to-r from-[#6f4e37] to-[#8b5e3c] px-4 py-2 text-sm font-medium text-white shadow-md transition-all duration-300 hover:from-[#5d4130] hover:to-[#7a5033] hover:shadow-lg',
  ICON_TRANSITION: 'transition-transform duration-300 group-hover:scale-110',
  BUTTON_CANCEL:
    'rounded-lg border-2 px-4 py-2 border-[#e6d9c9]/70 bg-white/80 font-semibold font-bold text-[#6f4e37] transition-all duration-300 hover:border-[#6f4e37] hover:bg-[#6f4e37]/10 hover:shadow-lg',
};

export {
  CARD_STYLES,
  TEXT_COLORS,
  BUTTON_STYLES,
  SHADOW_CARD_STYLE,
  CHILDREN_SHADOW_CARD_STYLE,
  COLOR,
};
