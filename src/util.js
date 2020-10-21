export function addUrlParams(url, params = {}) {
  if (!params || params === {}) {
    return url;
  }
  const urlArr = url.split('?');
  const paramsKey = Object.keys(params);
  const reg = new RegExp(`(${paramsKey.join('|')})=(\\w|.)+`);
  const restParams = typeof urlArr[1] !== 'undefined' ? urlArr[1].split('&').filter((item) => !reg.test(item)) : [];
  const resultParams = [...restParams, ...paramsKey.map((k) => `${k}=${params[k]}`)];

  return `${urlArr[0]}${Array.isArray(resultParams) && resultParams.length > 0 ? `?${resultParams.join('&')}` : ''}`;
}
