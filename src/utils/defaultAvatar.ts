export const getFallbackAvatar = (name?: string | null): string | null => {
  if (!name) return null;
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&background=6f4e37&color=fff&size=128&bold=true`;
};
