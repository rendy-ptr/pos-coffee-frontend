export const formatCloudinaryUrl = (
  url: string,
  options: {
    width?: number;
    quality?: number;
    format?: 'auto' | 'jpg' | 'png';
    fit?: 'crop' | 'fill';
  }
): string => {
  const parts = url.split('/upload/');
  if (parts.length !== 2) return url;

  const transformations = [
    options.width ? `w_${options.width}` : '',
    options.quality ? `q_${options.quality}` : '',
    options.format ? `f_${options.format}` : '',
    options.fit ? `c_${options.fit}` : '',
  ]
    .filter(Boolean)
    .join(',');

  return `${parts[0]}/upload/${transformations}/${parts[1]}`;
};
