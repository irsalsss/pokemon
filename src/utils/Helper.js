export const urlToId = (url) => {
  return url.slice(34, url.length).replace("/", '');
}