export const messageBuilder = (str, params) => {
  const keys = Object.keys(params);
  let result = str;
  for (const key of keys) {
    result = result.replace('${' + key + '}', params[key]);
  }
  return result;
};
