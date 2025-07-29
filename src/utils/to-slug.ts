export const toSlug = (input: string) => {
  let result = '';
  const whileList = '0123456789abcdefghijklmnopqrstuvwxyz-_';
  const separator = '-';

  for (let current of input) {
    const newCurrent = current.toLowerCase();
    if (whileList.includes(newCurrent)) {
      result += newCurrent;
    } else if (result.length && !result.endsWith(separator)) {
      result += separator;
    }
  }

  return result;
};
