import axios from 'axios';
import qs from 'qs';

async function client(url, { body, method, params } = {}){
  const cache = sessionStorage.cache ? JSON.parse(sessionStorage.cache) : {}
  const endpoint = 'https://pokeapi.co/api/v2' + url;
  const Axios = axios.create();

  if (cache[endpoint]){
    return { data: cache[endpoint] };
  }

  let headers = {
    "Content-type": "application/json; charset=UTF-8",
  }

  let config = {
    url: endpoint,
    headers: {
      ...headers
    },
  }

  if (params){
    config.params = params
    config.method = 'GET'
    config.paramsSerializer = params => {
      return qs.stringify(params, {
        arrayFormat: "brackets",
        encode: true,
        skipNulls: true
      })
    }
  }

  if (body){
    config.data = body
    config.method = method
  }

  const onSuccess = (r) => {
    sessionStorage.cache = JSON.stringify({ ...cache, [endpoint]: r.data } || {})
    return r
  }

  const onError = (e) => {
    return e.response
  }

  return Axios(config)
    .then(onSuccess)
    .catch(onError)
}

export default client;