export const SETTING_STYLES = {
  input:
    'h-12 rounded-xl border border-[#e6d9c9]/70 bg-white/80 px-4 text-[#5d4130] shadow-[0_1px_0_rgba(111,78,55,0.04)] transition-all duration-200 focus:border-[#6f4e37] focus:ring-4 focus:ring-[#6f4e37]/15 placeholder:text-[#b79c85]',

  inputWithIcon:
    'h-12 rounded-xl border border-[#e6d9c9]/70 bg-white/80 pl-12 pr-4 text-[#5d4130] shadow-[0_1px_0_rgba(111,78,55,0.04)] transition-all duration-200 focus:border-[#6f4e37] focus:ring-4 focus:ring-[#6f4e37]/15 placeholder:text-[#b79c85]',

  card: 'relative overflow-hidden rounded-2xl border border-[#e6d9c9]/70 bg-white/90 p-6 shadow-[0_24px_48px_-30px_rgba(111,78,55,0.55)] backdrop-blur-sm',

  sectionLabel:
    'text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#8c7158]',

  summaryPill:
    'inline-flex items-center gap-2 rounded-2xl border border-[#e6d9c9]/60 bg-white/90 px-3 py-1.5 text-xs font-medium text-[#5d4130] shadow-sm',

  container:
    'relative overflow-hidden rounded-3xl border border-[#e6d9c9]/70 bg-gradient-to-br from-[#fdf7f1] via-white to-[#f5e7d6] p-6 shadow-[0_32px_60px_-30px_rgba(111,78,55,0.45)] sm:p-10',
} as const;

export type SettingStylesType = typeof SETTING_STYLES;
