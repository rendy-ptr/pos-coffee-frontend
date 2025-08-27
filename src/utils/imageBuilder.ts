/**
 * ===========================
 *  Unsplash Helper
 * ===========================
 */
export const buildUnsplashUrl = (
  url: string,
  {
    w,
    h,
    q = 80,
    fit = 'crop',
  }: {
    w?: number;
    h?: number;
    q?: number;
    fit?: 'crop' | 'fill' | 'scale';
  } = {}
): string => {
  const params = new URLSearchParams();
  if (w) params.append('w', String(w));
  if (h) params.append('h', String(h));
  if (q) params.append('q', String(q));
  if (fit) params.append('fit', fit);
  params.append('auto', 'format');

  return `${url.split('?')[0]}?${params.toString()}`;
};

/**
 * ===========================
 *  Cloudinary Helper
 * ===========================
 */
export const buildCloudinaryUrl = (
  url: string,
  {
    w,
    h,
    q,
    format = 'auto',
    fit = 'fill',
  }: {
    w?: number;
    h?: number;
    q?: number;
    format?: 'auto' | 'jpg' | 'png' | 'webp';
    fit?: 'crop' | 'fill' | 'scale' | 'fit';
  } = {}
): string => {
  const parts = url.split('/upload/');
  if (parts.length !== 2) return url;

  const transformations = [
    w ? `w_${w}` : '',
    h ? `h_${h}` : '',
    q ? `q_${q}` : '',
    format ? `f_${format}` : '',
    fit ? `c_${fit}` : '',
  ]
    .filter(Boolean)
    .join(',');

  return `${parts[0]}/upload/${transformations}/${parts[1]}`;
};

export const resolveImageUrl = (
  url: string,
  options: { w?: number; h?: number; q?: number } = {}
): string => {
  if (!url) return '';

  if (url.includes('images.unsplash.com')) {
    return buildUnsplashUrl(url, options);
  }

  if (url.includes('res.cloudinary.com')) {
    return buildCloudinaryUrl(url, options);
  }

  return url;
};
