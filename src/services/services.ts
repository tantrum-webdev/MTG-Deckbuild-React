import endpoints from '@/config/endpoints';

const getUrl = (key: string) => {
  return import.meta.env.MODE === 'development' ? key : endpoints.base + key;
};

export const fetcher = async (key: string) => {
  const res = await fetch(getUrl(key));
  return res.json();
};
