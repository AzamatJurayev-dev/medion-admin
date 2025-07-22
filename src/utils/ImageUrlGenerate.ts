export const imageUrlGenerator = (url?: string | null): string => {
  const baseUrl = import.meta.env.VITE_BASE_MEDIA_URL || "";
  return url ? `${baseUrl}${url}` : "/images/default.jpg";
};
