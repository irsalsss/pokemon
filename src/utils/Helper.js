export const urlToId = (url) => {
  return url.slice(34, url.length).replace("/", '');
}

export const successfullLogic = () => {
  const randomNumber =  Math.floor(Math.random() * Math.floor(100));
  return randomNumber < 50;
}