export const uniqBy = (array, iteratee) => {
  const map = array.reduce((acc, currValue) => {
    const key = iteratee(currValue);

    acc.has(key) || acc.set(key, currValue);
    return acc;
  }, new Map());

  return [...map.values()];
};

// This logic should rather belong to the server
export const normalizeTransactionsData = (array) => {
  const data = [];
  const map = array.reduce((acc, currValue) => {
    const { timestamp } = currValue;
    const date = timestamp.split('T')[0];
    if (!acc.has(date)) {
      acc.set(date, [currValue]);
    } else {
      const dateArr = acc.get(date);
      dateArr.push(currValue);
      acc.set(date, dateArr);
    }
    return acc;
  }, new Map());

  for (let [key, value] of map) {
    data.push({ key, value });
  }

  return data;
};
